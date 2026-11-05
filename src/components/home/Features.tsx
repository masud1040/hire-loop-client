'use client';

import { 
  Search, 
  TrendingUp, 
  BarChart2, 
  Bookmark, 
  MousePointerClick, 
  FileText, 
  Hexagon, 
  ArrowUpRight 
} from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: 'Smart Search',
    description: 'Find your ideal job with advanced filters.',
    icon: Search,
  },
  {
    id: 2,
    title: 'Salary Insights',
    description: 'Get real salary data to negotiate confidently.',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'Top Companies',
    description: 'Apply to vetted companies that are hiring.',
    icon: BarChart2,
  },
  {
    id: 4,
    title: 'Saved Jobs',
    description: 'Manage apps & favorites on your dashboard.',
    icon: Bookmark,
  },
  {
    id: 5,
    title: 'One-Click Apply',
    description: 'Simplify your job applications for an easier process.',
    icon: MousePointerClick,
  },
  {
    id: 6,
    title: 'Resume Builder',
    description: 'Create professional resumes with modern templates.',
    icon: FileText,
  },
  {
    id: 7,
    title: 'Skill-Based Matching',
    description: 'Discover jobs that match your skills and experience.',
    icon: Hexagon,
  },
  {
    id: 8,
    title: 'Career Growth Resources',
    description: 'Boost your career with quick interview tips.',
    icon: ArrowUpRight,
  },
];

export function Features() {
  return (
    <section className="w-full bg-[#050505] py-24 px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 bg-[#6558ff] rounded-sm"></div>
          <span className="text-xs font-mono text-gray-400 tracking-[0.2em] uppercase">
            Features Job
          </span>
          <div className="w-1.5 h-1.5 bg-[#6558ff] rounded-sm"></div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight text-center max-w-2xl mb-16 leading-tight">
          Everything you need <br /> to succeed
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="flex gap-4 group cursor-default">
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-[#0f0f11] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-white/10 group-hover:bg-[#16161a] transition-all duration-300 shadow-lg">
                  <Icon className="w-5 h-5 text-[#f472b6] group-hover:text-[#f9a8d4] group-hover:scale-110 transition-all duration-300" />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col pt-1">
                  <h3 className="text-gray-200 font-medium text-base mb-1.5 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}