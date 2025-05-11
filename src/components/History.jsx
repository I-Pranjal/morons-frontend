import React, { useState, useEffect } from 'react';
import { Clock, FileText, Video, Search, Trash2, ChevronDown } from 'lucide-react';
import { fetchUserHistory, formatHistoryDate, deleteHistoryItem } from '../data/historyData';

/**
 * History component that displays user's past activities
 * Can be used both in the sidebar and as a standalone dashboard page
 * 
 * @param {Object} props
 * @param {string} props.userId - User ID for fetching history
 * @param {boolean} props.compact - Whether to show compact view (for sidebar)
 * @param {number} props.limit - Maximum number of items to show initially
 * @param {function} props.onItemClick - Handler for when an item is clicked
 */
const History = ({ userId = 'current-user', compact = false, limit = 5, onItemClick }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [showMore, setShowMore] = useState(false);
  const [allItems, setAllItems] = useState([]);

  // Fetch history items on mount or when filters change
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const filters = selectedType !== 'all' ? { type: selectedType } : {};
        const data = await fetchUserHistory(userId, filters);
        setAllItems(data);
        setHistoryItems(data.slice(0, showMore ? data.length : limit));
        setError(null);
      } catch (err) {
        console.error('Failed to load history:', err);
        setError('Failed to load history items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [userId, limit, selectedType, showMore]);

  // Handle expanding the history list
  const handleShowMore = () => {
    setShowMore(true);
  };

  // Handle history item deletion
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    try {
      await deleteHistoryItem(id);
      // Update local state after successful deletion
      const updatedItems = allItems.filter(item => item.id !== id);
      setAllItems(updatedItems);
      setHistoryItems(updatedItems.slice(0, showMore ? updatedItems.length : limit));
    } catch (err) {
      console.error('Failed to delete history item:', err);
      setError('Failed to delete item. Please try again.');
    }
  };

  // Get appropriate icon based on history item type
  const getItemIcon = (type) => {
    switch (type) {
      case 'resume':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'interview':
        return <Video className="h-4 w-4 text-yellow-500" />;
      case 'job':
        return <Search className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  // Render loading state
  if (isLoading && compact) {
    return (
      <div className="py-2 px-4">
        <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Render error state
  if (error && compact) {
    return <div className="text-xs text-red-500 p-2">{error}</div>;
  }

  // For dashboard (non-compact) view, include filter tabs
  const renderFilterTabs = () => {
    if (compact) return null;
    
    const tabs = [
      { id: 'all', label: 'All' },
      { id: 'resume', label: 'Resumes' },
      { id: 'interview', label: 'Interviews' },
      { id: 'job', label: 'Job Searches' }
    ];
    
    return (
      <div className="flex space-x-1 mb-4 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              selectedType === tab.id 
                ? 'border-b-2 border-yellow-500 text-black' 
                : 'text-gray-500 hover:text-black'
            }`}
            onClick={() => setSelectedType(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  // Check if there are more items to show
  const hasMoreItems = allItems.length > historyItems.length;

  return (
    <div className={`${compact ? 'py-1' : 'p-4 bg-white rounded-lg shadow-sm'}`}>
      {!compact && <h2 className="text-lg font-medium mb-2">Activity History</h2>}
      {!compact && renderFilterTabs()}
      
      {/* Empty state */}
      {historyItems.length === 0 && (
        <div className={`text-center ${compact ? 'py-2' : 'py-8'}`}>
          <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
            No history items found
          </p>
        </div>
      )}
      
      {/* History items list */}
      <div className={`${compact ? 'space-y-1' : 'space-y-2'} ${showMore ? 'max-h-64 overflow-y-auto pr-1' : ''}`}>
        {historyItems.map(item => (
          <div
            key={item.id}
            onClick={() => onItemClick && onItemClick(item)}
            className={`
              ${compact 
                ? 'px-3 py-2 hover:bg-yellow-50 cursor-pointer flex items-center'
                : 'p-3 border border-gray-100 rounded-md hover:bg-yellow-50 cursor-pointer flex justify-between items-center'
              }
            `}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {getItemIcon(item.type)}
              </div>
              <div className={`ml-2 ${compact ? 'truncate max-w-full' : ''}`}>
                <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-black truncate`}>
                  {item.title}
                </p>
                <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500`}>
                  {formatHistoryDate(item.date)}
                </p>
                {!compact && (
                  <p className="text-xs text-gray-500 mt-1">{item.summary}</p>
                )}
              </div>
            </div>
            
            {!compact && (
              <button
                onClick={(e) => handleDelete(e, item.id)}
                className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Delete history item"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Show more button for compact mode */}
      {compact && hasMoreItems && !showMore && (
        <div className="pt-1 pb-1 px-3">
          <button 
            onClick={handleShowMore}
            className="flex items-center text-xs text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            Show more
            <ChevronDown size={12} className="ml-1" />
          </button>
        </div>
      )}
      
      {/* View all link for compact mode */}
      {compact && (
        <div className="pt-1 pb-1 px-3">
          <a 
            href="/history" 
            className="text-xs text-yellow-600 hover:text-yellow-800 hover:underline"
          >
            View all history
          </a>
        </div>
      )}
    </div>
  );
};

export default History;