import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LibraryFilters } from './LibraryFilters';
import { AgentCategoryGrid } from './AgentCategoryGrid';
import MrEliteRecommendations from './MrEliteRecommendations';

const LibraryHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agent Library</h1>
            <p className="text-gray-600">Browse and install AI agents to personalize your GeniOS</p>
          </div>
          
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search agents... (e.g., Resume, Practice, etc.)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">🎯</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Mr. Elite</div>
            <div className="text-xs text-gray-600">
              "You're building a custom OS for your career. Pick the agents that align with your goals — I'll assist you from here."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LibraryLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    level: '',
    goal: ''
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LibraryHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex">
        <LibraryFilters 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters} 
        />
        
        <div className="flex-1 p-8">
          <MrEliteRecommendations 
            searchQuery={searchQuery} 
            filters={selectedFilters} 
          />
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Agent Categories</h2>
            <p className="text-gray-600">Choose agents that align with your career goals</p>
          </div>
          
          <AgentCategoryGrid 
            searchQuery={searchQuery} 
            filters={selectedFilters} 
          />
        </div>
      </div>
    </div>
  );
};