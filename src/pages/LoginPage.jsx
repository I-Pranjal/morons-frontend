import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, LockIcon, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { signIn, signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const toggleForm = () => setIsSignup(!isSignup);

  const handleSubmit = async () => {
    const result = isSignup
      ? await signUp({ ...form })
      : await signIn({ email: form.email, password: form.password });

    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2"> 
            <div className="bg-red-100 p-2 rounded-full">
              <Brain size={32} className="text-red-500" />
            </div>
          </div>
          <h2 className="text-lg font-semibold"> 
            {isSignup ? 'Join GeniOS' : 'Welcome back to GeniOS'} 
          </h2>
        </div>

        {isSignup && (
          <div className="mb-3">
            <Input
              icon={<UserIcon size={16} />}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        )}

        <div className="mb-3">
          <Input
            icon={<MailIcon size={16} />}
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-4 relative">
          <Input
            icon={<LockIcon size={16} />}
            placeholder={isSignup ? 'Create a password' : 'Enter your password'}
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </span>
        </div>

        <Button
          className="w-full bg-red-500 text-white hover:bg-red-600"
          onClick={handleSubmit}
          disabled={loading}
        >
          {isSignup ? 'Create Account' : 'Sign In'}
        </Button>

        {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <span onClick={toggleForm} className="text-red-500 cursor-pointer font-medium">Sign in</span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span onClick={toggleForm} className="text-red-500 cursor-pointer font-medium">Sign up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
