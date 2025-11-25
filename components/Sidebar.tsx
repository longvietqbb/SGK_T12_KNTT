import React from 'react';
import { TEXTBOOK_DATA } from '../data';
import { Chapter, Lesson } from '../types';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson, chapter: Chapter) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson, isOpen, onCloseMobile }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobile}
      />
      
      {/* Sidebar Content */}
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white border-r border-slate-200 z-30 transition-transform duration-300 md:translate-x-0 md:static overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 bg-teal-600">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📚</span> Toán 12
          </h1>
          <p className="text-teal-100 text-sm mt-1">Kết nối tri thức</p>
        </div>

        <div className="py-4">
          {TEXTBOOK_DATA.map((chapter) => (
            <div key={chapter.id} className="mb-2">
              <div className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {chapter.title}
              </div>
              <ul>
                {chapter.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => {
                        onSelectLesson(lesson, chapter);
                        onCloseMobile();
                      }}
                      className={`w-full text-left px-6 py-3 text-sm transition-colors duration-150 border-l-4 ${
                        currentLessonId === lesson.id
                          ? 'border-teal-500 bg-teal-50 text-teal-700 font-medium'
                          : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {lesson.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
