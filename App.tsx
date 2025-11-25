import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import ChatBot from './components/ChatBot';
import { TEXTBOOK_DATA } from './data';
import { Chapter, Lesson } from './types';

// Default initial state
const INITIAL_CHAPTER = TEXTBOOK_DATA[0];
const INITIAL_LESSON = INITIAL_CHAPTER.lessons[0];

const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<Chapter>(INITIAL_CHAPTER);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(INITIAL_LESSON);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectLesson = (lesson: Lesson, chapter: Chapter) => {
    setCurrentLesson(lesson);
    setCurrentChapter(chapter);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      {/* Sidebar */}
      <Sidebar 
        currentLessonId={currentLesson.id}
        onSelectLesson={handleSelectLesson}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-teal-600 text-white p-4 flex items-center justify-between shadow-md z-10">
          <button onClick={() => setIsSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold">Toán 12</span>
          <div className="w-6"></div> {/* Spacer for center alignment */}
        </div>

        {/* Content */}
        <LessonView lesson={currentLesson} chapter={currentChapter} />

        {/* Chatbot */}
        <ChatBot />
      </div>
    </div>
  );
};

export default App;
