import React from 'react';
import { Search, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

export const LibraryHeader = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Agent Library</h1>
            <p className="text-muted-foreground">
              Browse and install AI agents to personalize your GeniOS
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search agents... (e.g., Resume, Practice, PM)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
        
        {/* Mr. Elite Banner */}
        <div className="mt-4 bg-primary/5 border border-primary/10 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Mr. Elite</div>
              <p className="text-sm text-muted-foreground">
                "You're building a custom OS for your career. Pick the agents that align with your goals — I'll assist you from here."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
