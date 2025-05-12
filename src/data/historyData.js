// src/data/historyData.js

/**
 * Sample history data for development and testing
 * 
 * In production, this data would come from:
 * 1. API calls to the backend
 * 2. Redux/Context state that stores user history
 * 3. Local storage for offline functionality
 */

export const historyData = [
  {
    id: 'hist_001',
    title: 'Resume Review - Software Engineer',
    date: '2025-05-08T14:30:00',
    type: 'resume',
    summary: 'Review of full-stack developer resume with AI feedback',
    path: '/login'
  },
  {
    id: 'hist_002',
    title: 'Mock Interview - Product Manager',
    date: '2025-05-05T10:15:00',
    type: 'interview',
    summary: 'Practice interview for Amazon PM position',
    path: '/login'
  },
  {
    id: 'hist_003',
    title: 'Job Search - Remote Positions',
    date: '2025-05-01T16:45:00',
    type: 'job',
    summary: 'Search results for remote engineering roles',
    path: '/login'
  },
  {
    id: 'hist_004',
    title: 'Resume ATS Optimization',
    date: '2025-04-28T11:20:00',
    type: 'resume',
    summary: 'ATS optimization for marketing resume',
    path: '/login'
  },
  {
    id: 'hist_005',
    title: 'Behavioral Interview Practice',
    date: '2025-04-25T09:00:00',
    type: 'interview',
    summary: 'Leadership and teamwork question practice',
    path: '/login'
  }
];

// Functions for history data management
// These would connect to backend APIs in production

/**
 * Fetch user history from backend
 * @param {string} userId - The user's unique identifier
 * @param {Object} filters - Optional filters like date range, type
 * @returns {Promise} Promise that resolves to history items
 */
export const fetchUserHistory = async (userId, filters = {}) => {
  // In production, this would be an API call
  // Example: return api.get(`/users/${userId}/history`, { params: filters });
  
  // For development, return sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Apply any filters (just demonstrating the concept)
      let filteredData = [...historyData];
      
      if (filters.type) {
        filteredData = filteredData.filter(item => item.type === filters.type);
      }
      
      if (filters.startDate) {
        filteredData = filteredData.filter(item => 
          new Date(item.date) >= new Date(filters.startDate)
        );
      }
      
      resolve(filteredData);
    }, 300); // Simulate network delay
  });
};

/**
 * Delete history item
 * @param {string} historyId - ID of history item to delete
 * @returns {Promise} Promise that resolves when deletion is complete
 */
export const deleteHistoryItem = async (historyId) => {
  // In production: return api.delete(`/history/${historyId}`);
  
  console.log(`Deleting history item: ${historyId}`);
  return Promise.resolve({ success: true });
};

/**
 * Format date for display in history items
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatHistoryDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Show as "Today" or "Yesterday" if applicable
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    // Otherwise show formatted date
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};