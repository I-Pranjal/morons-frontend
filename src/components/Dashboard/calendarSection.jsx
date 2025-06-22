import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Check, X } from 'lucide-react';

const CalendarNotesSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
 const [tasks, setTasks] = useState([
  { id: 1, text: 'Complete project proposal', completed: false, date: new Date().toDateString() },
  { id: 2, text: 'Review team presentations', completed: true, date: new Date().toDateString() },
  { id: 3, text: 'Update dashboard UI', completed: false, date: new Date().toDateString() },
  { id: 4, text: 'Write unit tests for new features', completed: false, date: new Date().toDateString() },
  { id: 5, text: 'Organize client feedback session', completed: true, date: new Date().toDateString() },
  { id: 6, text: 'Fix bugs from QA report', completed: false, date: new Date().toDateString() },
  { id: 7, text: 'Plan team outing', completed: false, date: new Date().toDateString() },
]);

  const [newTask, setNewTask] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date && date.toDateString() === selectedDate.toDateString();
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        date: selectedDate.toDateString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setIsAddingTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTasksForSelectedDate = () => {
    return tasks.filter(task => task.date === selectedDate.toDateString());
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      
      {/* Calendar Section */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={18} className="text-amber-300" />
          </button>
          <h2 className="text-lg font-medium text-amber-300">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={18} className="text-amber-300" />
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-gray-500 text-xs font-medium py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && setSelectedDate(date)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                ${!date ? 'invisible' : ''}
                ${isToday(date) ? 'bg-amber-300 text-white font-semibold' : ''}
                ${isSelected(date) && !isToday(date) ? 'bg-amber-300/20 text-amber-300' : ''}
                ${!isToday(date) && !isSelected(date) ? 'hover:bg-gray-100 text-gray-700' : ''}
              `}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Notes/Tasks Section */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-amber-300">Tasks</h3>
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-amber-300 hover:bg-amber-400 text-white p-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="mb-3 text-sm text-gray-600">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>

        {/* Add Task Input */}
        {isAddingTask && (
          <div className="mb-4 space-y-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-300"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={addTask}
                className="bg-amber-300 hover:bg-amber-400 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTask('');
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {getTasksForSelectedDate().length === 0 ? (
            <div className="text-gray-500 text-center py-8 text-sm">
              No tasks for this date
            </div>
          ) : (
            getTasksForSelectedDate().map(task => (
              <div
                key={task.id}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${task.completed 
                    ? 'bg-gray-100 text-gray-500' 
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0
                    ${task.completed 
                      ? 'bg-amber-300 border-amber-300 text-white' 
                      : 'border-gray-400 hover:border-amber-300'
                    }
                  `}
                >
                  {task.completed && <Check size={10} />}
                </button>
                
                <span className={`flex-1 text-sm ${task.completed ? 'line-through' : ''}`}>
                  {task.text}
                </span>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 p-1 transition-colors flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarNotesSection;