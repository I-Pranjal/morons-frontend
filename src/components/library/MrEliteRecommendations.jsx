import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, FileText, Map, Zap } from 'lucide-react';

const recommendedAgents = [
  {
    id: 'resume-agent',
    name: 'Resume Agent',
    icon: FileText,
    description: 'Build ATS-optimized resumes'
  },
  {
    id: 'roadmap-agent',
    name: 'Roadmap Agent',
    icon: Map,
    description: 'Plan your career timeline'
  },
  {
    id: 'practice-agent',
    name: 'Practice Agent',
    icon: Zap,
    description: 'Daily skill challenges'
  }
];

export const MrEliteRecommendations = () => {
  const handleOpenAgent = (agentId) => {
    console.log(`Opening agent: ${agentId}`);
    // Navigate to agent dashboard
  };

  return (
    <div className="w-full max-w mx-auto">
      <Card className="border shadow-sm bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-orange-600" />
            </div>
            Mr. Elite Recommendations
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Based on your career goal and timeline, Mr. Elite recommends installing:
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4">
            {recommendedAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-900">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleOpenAgent(agent.id)}
                    size="sm"
                    className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 text-xs font-medium rounded-md flex items-center gap-1.5 ml-2"
                  >
                    Open
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MrEliteRecommendations;