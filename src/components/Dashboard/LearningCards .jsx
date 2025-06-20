import { BookOpen, Hammer, FileText, ShieldCheck } from 'lucide-react';

const dashboardItems = [
  { icon: BookOpen, title: 'Fundamentals', color: 'bg-yellow-100 border-yellow-200', iconBg: 'bg-yellow-300/30' },
  { icon: Hammer, title: 'Practice & Project', color: 'bg-orange-100 border-orange-200', iconBg: 'bg-orange-300/30' },
  { icon: FileText, title: 'Resume & Portfolio Builder', color: 'bg-blue-100 border-blue-200', iconBg: 'bg-blue-300/30' },
  { icon: ShieldCheck, title: 'Mock Interview & Miscellaneous', color: 'bg-pink-100 border-pink-200', iconBg: 'bg-pink-300/30' },
];

const LearningCards = () => {
  return (
    <div className="flex flex-row flex-wrap gap-6 sm:gap-12 py-24 px-6 sm:px-12 bg-neutral-900 justify-center items-center">
      {dashboardItems.map(({ icon: Icon, title, color, iconBg }, idx) => (
        <div
          key={idx}
          className={`w-[70px] sm:w-[280px] h-[70px] ${color} rounded-3xl border transition-all duration-300 hover:border-white hover:shadow-[5px_7px_7px_rgba(255,255,255,0.3)] cursor-pointer flex flex-row justify-center items-center p-4`}
        >
          <div className={`p-3 rounded-xl ${iconBg} text-black flex items-center justify-center`}>
            <Icon className="size-6" />
          </div>
          <p className="text-black text-base font-semibold hidden sm:block ml-4">{title}</p>
        </div>
      ))}
    </div>
  );
};

export default LearningCards;
