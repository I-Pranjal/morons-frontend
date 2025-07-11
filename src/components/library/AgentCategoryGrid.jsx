import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';

const agentCategories = [
  {
    id: 'learning-agents',
    name: 'Learning Agents',
    icon: '📘',
    agents: [
      { 
        id: 'roadmap-agent', 
        name: 'Roadmap Agent', 
        status: 'active', 
        description: 'Create personalized learning roadmaps' 
      },
      { 
        id: 'industry-agent', 
        name: 'Industry Applications Agent', 
        status: 'coming_soon', 
        description: 'Learn industry-specific applications' 
      },
      { 
        id: 'content-suggestor', 
        name: 'Content Suggestor Agent', 
        status: 'coming_soon', 
        description: 'Get curated learning content' 
      }
    ]
  },
  {
    id: 'practice-agents',
    name: 'Practice Agents',
    icon: '🧪',
    agents: [
      { 
        id: 'practice-agent', 
        name: 'Practice Agent', 
        status: 'active', 
        description: 'Daily coding challenges and skill practice' 
      },
      { 
        id: 'mock-agent', 
        name: 'Mock Interview Agent', 
        status: 'coming_soon', 
        description: 'AI-powered mock interviews' 
      },
      { 
        id: 'skill-check-agent', 
        name: 'Skill Evaluator Agent', 
        status: 'coming_soon', 
        description: 'Comprehensive skill assessments' 
      }
    ]
  },
  {
    id: 'content-agents',
    name: 'Content Agents',
    icon: '📄',
    agents: [
      { 
        id: 'resume-agent', 
        name: 'Resume Agent', 
        status: 'active', 
        description: 'Generate ATS-optimized resumes' 
      },
      { 
        id: 'linkedin-agent', 
        name: 'LinkedIn Optimizer Agent', 
        status: 'coming_soon', 
        description: 'Optimize your LinkedIn profile' 
      },
      { 
        id: 'cold-email-agent', 
        name: 'Cold Writer Agent', 
        status: 'coming_soon', 
        description: 'Write effective cold emails' 
      }
    ]
  },
  {
    id: 'startup-agents',
    name: 'Startup Agents',
    icon: '🚀',
    agents: [
      { 
        id: 'startup-builder', 
        name: 'Startup Builder Agent', 
        status: 'coming_soon', 
        description: 'Build your startup from idea to launch' 
      },
      { 
        id: 'deck-agent', 
        name: 'Deck Generator Agent', 
        status: 'coming_soon', 
        description: 'Create compelling pitch decks' 
      }
    ]
  },
  {
    id: 'skills-agents',
    name: 'Skills Agents',
    icon: '🛠',
    agents: [
      { 
        id: 'project-generator', 
        name: 'Project Ideas Agent', 
        status: 'active', 
        description: 'Generate intelligent, ambition-aligned project ideas and get step-by-step execution plans — powered by Mr. Elite.' 
      },
      { 
        id: 'project-generator-2', 
        name: 'Project Generator Agent', 
        status: 'coming_soon', 
        description: 'Generate project ideas and guides' 
      },
      { 
        id: 'cert-agent', 
        name: 'Certification Tracker', 
        status: 'coming_soon', 
        description: 'Track and plan certifications' 
      }
    ]
  }
];

export const AgentCategoryGrid = ({ searchQuery, filters }) => {
  const getActionButton = (agent) => {
    switch (agent.status) {
      case 'active':
        return (
          <Button size="sm" className="bg-red-800 hover:bg-red-700 text-white">
            <ArrowRight className="w-4 h-4 mr-2" />
            Open Dashboard
          </Button>
        );
      case 'coming_soon':
        return (
          <Button size="sm" variant="ghost" disabled className="text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            Coming Soon
          </Button>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Active</Badge>;
      case 'coming_soon':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const filteredCategories = agentCategories.filter(category => {
    if (filters.category && !category.name.toLowerCase().includes(filters.category.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {filteredCategories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">{category.icon}</span>
            </div>
            <h2 className="text-xl font-semibold">{category.name}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.agents
              .filter(agent => {
                if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  !agent.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return false;
                }
                return true;
              })
              .map((agent) => (
                <Card key={agent.id} className="p-6 hover:shadow-md transition-shadow border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-base">{agent.name}</h3>
                      {getStatusBadge(agent.status)}
                    </div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {agent.description}
                    </p>
                    
                    <div className="pt-2">
                      {getActionButton(agent)}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};