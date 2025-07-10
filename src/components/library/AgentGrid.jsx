import React from 'react';
import { FileText, Target, BookOpen, MessageSquare, TrendingUp, Star, CheckCircle, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const agents = [
  {
    icon: FileText,
    name: 'Resume Agent',
    type: 'Output Agents',
    description: 'Craft ATS-proof resumes tailored to your dream role',
    tags: ['SDE', 'Career', 'Beginner'],
    rating: 4.9,
    installs: '2.1k',
    installed: true,
    trending: false
  },
  {
    icon: Target,
    name: 'Practice Agent',
    type: 'Practice Agents',
    description: 'Level up your skills daily. Get AI-generated challenges and instant feedback',
    tags: ['DSA', 'Coding', 'Intermediate'],
    rating: 4.8,
    installs: '1.8k',
    installed: true,
    trending: true
  },
  {
    icon: BookOpen,
    name: 'Roadmap Agent',
    type: 'Guidance Agents',
    description: 'Create a personalized learning map with deadlines, modules, and guidance',
    tags: ['Planning', 'Career', 'Beginner'],
    rating: 4.7,
    installs: '1.5k',
    installed: false,
    trending: false
  },
  {
    icon: MessageSquare,
    name: 'Feedback Agent',
    type: 'Companion Agents',
    description: 'Weekly nudges and MDS score analysis',
    tags: ['Motivation', 'Analytics', 'Advanced'],
    rating: 4.6,
    installs: '892',
    installed: false,
    trending: true
  },
  {
    icon: TrendingUp,
    name: 'Interview Agent',
    type: 'Practice Agents',
    description: 'Mock interviews with AI, personalized feedback, and improvement tips',
    tags: ['Interview', 'SDE', 'Intermediate'],
    rating: 4.9,
    installs: '2.5k',
    installed: false,
    trending: true
  },
  {
    icon: Star,
    name: 'Networking Agent',
    type: 'Guidance Agents',
    description: 'Build your professional network with smart connection strategies',
    tags: ['Networking', 'Career', 'Advanced'],
    rating: 4.5,
    installs: '743',
    installed: false,
    trending: false
  }
];

export const AgentGrid = ({ searchQuery, filters }) => {
  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      !searchQuery ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !filters.category || agent.type === filters.category;
    const matchesLevel = !filters.level || agent.tags.includes(filters.level);
    const matchesGoal =
      !filters.goal ||
      (filters.goal.includes('SDE') && agent.tags.includes('SDE')) ||
      (filters.goal.includes('PM') && agent.tags.includes('PM'));

    return matchesSearch && matchesCategory && matchesLevel && matchesGoal;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Available Agents</h2>
          <p className="text-gray-500 text-sm mt-1">{filteredAgents.length} agents found</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-800 border-orange-200">
            <TrendingUp className="w-3 h-3" />
            Popular This Week
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map(agent => {
          const Icon = agent.icon;
          return (
            <Card key={agent.name} className="hover:shadow-lg transition-shadow duration-200 bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      {agent.trending && (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                          🔥 Trending
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs text-gray-600 border-gray-300">
                      {agent.type}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {agent.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span className="font-medium">{agent.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{agent.installs}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    agent.installed 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                  variant={agent.installed ? 'outline' : 'default'}
                  disabled={agent.installed}
                >
                  {agent.installed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Installed
                    </>
                  ) : (
                    'Install Agent'
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};