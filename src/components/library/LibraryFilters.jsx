import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const filterOptions = {
  category: ['Learning Agents', 'Practice Agents', 'Content Agents', 'Startup Agents', 'Skills Agents'],
  level: ['Beginner', 'Intermediate', 'Advanced'],
  goal: ['SDE @ Google', 'PM @ Meta', 'Startup Founder', 'Designer @ Figma', 'Data Scientist']
};

export const LibraryFilters = ({ selectedFilters, setSelectedFilters }) => {
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: selectedFilters[filterType] === value ? '' : value
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({ category: '', level: '', goal: '' });
  };

  return (
    <div className="w-64 bg-background border-r border-border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-sm">
          Clear All
        </Button>
      </div>
      
      <div className="space-y-8">
        {/* Category */}
        <div>
          <h3 className="font-medium mb-4 text-base">Agent Category</h3>
          <div className="space-y-2">
            {filterOptions.category.map(option => (
              <Button
                key={option}
                variant={selectedFilters.category === option ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start text-sm font-normal h-9"
                onClick={() => handleFilterChange('category', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <h3 className="font-medium mb-4 text-base">Experience Level</h3>
          <div className="space-y-2">
            {filterOptions.level.map(option => (
              <Button
                key={option}
                variant={selectedFilters.level === option ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start text-sm font-normal h-9"
                onClick={() => handleFilterChange('level', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <h3 className="font-medium mb-4 text-base">Career Goal</h3>
          <div className="space-y-2">
            {filterOptions.goal.map(option => (
              <Button
                key={option}
                variant={selectedFilters.goal === option ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start text-sm font-normal h-9"
                onClick={() => handleFilterChange('goal', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-sm font-normal">
              View Active Agents
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-sm font-normal">
              See Roadmap
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-sm font-normal">
              Check Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};