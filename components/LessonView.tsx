
import React, { useState, useEffect } from 'react';
import { Lesson, Chapter, TheoryItem, MultipleChoiceQuestion, TrueFalseQuestion, RealWorldApplication } from '../types';

interface LessonViewProps {
  lesson: Lesson;
  chapter: Chapter;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, chapter }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'examples' | 'exercises' | 'practice' | 'application'>('theory');
  
  // State cho trắc nghiệm MCQ (lưu index đáp án đã chọn)
  const [selectedMcq, setSelectedMcq] = useState<Record<number, number>>({});
  
  // State cho trắc nghiệm Đúng/Sai (lưu trạng thái true/false của từng ý a,b,c,d)
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean | null>>({}); // key format: "qId-stmtId"
  const [tfChecked, setTfChecked] = useState<Record<number, boolean>>({}); // Kiểm tra từng câu hỏi lớn

  // Trigger MathJax typesetting whenever content changes
  useEffect(() => {
    if ((window as any).MathJax) {
      // Use typesetPromise to avoid race conditions
      (window as any).MathJax.typesetPromise && (window as any).MathJax.typesetPromise();
    }
  }, [lesson, activeTab, selectedMcq, tfChecked]);

  // Helper render Theory
  const renderTheoryItem = (item: TheoryItem, index: number) => {
    switch (item.type) {
      case 'definition':
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm mb-5 transition-transform hover:scale-[1.01] duration-200">
            <h4 className="text-blue-700 font-bold mb-2 flex items-center gap-2">
              <i className="fas fa-book-open"></i> {item.title || 'Định nghĩa'}
            </h4>
            <div className="text-slate-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
              {item.content}
            </div>
          </div>
        );
      case 'theorem':
        return (
          <div key={index} className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm mb-5 transition-transform hover:scale-[1.01] duration-200">
            <h4 className="text-purple-700 font-bold mb-2 flex items-center gap-2">
              <i className="fas fa-star"></i> {item.title || 'Định lý'}
            </h4>
            <div className="text-slate-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
              {item.content}
            </div>
          </div>
        );
      case 'method':
        return (
          <div key={index} className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm mb-5 transition-transform hover:scale-[1.01] duration-200">
            <h4 className="text-green-700 font-bold mb-2 flex items-center gap-2">
              <i className="fas fa-list-check"></i> {item.title || 'Phương pháp giải'}
            </h4>
            <div className="text-slate-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
              {item.content}
            </div>
          </div>
        );
      case 'note':
        return (
          <div key={index} className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg shadow-sm mb-5 transition-transform hover:scale-[1.01] duration-200">
            <h4 className="text-amber-700 font-bold mb-2 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle"></i> {item.title || 'Chú ý'}
            </h4>
            <div className="text-slate-700 whitespace-pre-line leading-relaxed italic text-sm md:text-base">
              {item.content}
            </div>
          </div>
        );
      default:
        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-slate-200">
             {item.title && <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>}
            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{item.content}</p>
          </div>
        );
    }
  };

  // Helper render MCQ
  const renderMCQ = (q: MultipleChoiceQuestion) => {
    const selected = selectedMcq[q.id];
    const isAnswered = selected !== undefined;
    const isCorrect = selected === q.correctIndex;

    return (
      <div key={q.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex gap-3 mb-4">
          <span className="bg-teal-100 text-teal-800 font-bold px-2 py-1 rounded text-sm h-fit whitespace-nowrap">Câu {q.id}</span>
          <p className="font-medium text-slate-800 text-lg">{q.question}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {q.options.map((opt, idx) => {
            let btnClass = "p-4 rounded-lg border text-left transition-all relative ";
            if (isAnswered) {
              if (idx === q.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-800";
              else if (idx === selected) btnClass += "bg-red-50 border-red-500 text-red-800";
              else btnClass += "bg-slate-50 border-slate-200 opacity-60";
            } else {
              btnClass += "bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50 cursor-pointer";
            }

            return (
              <button 
                key={idx}
                onClick={() => !isAnswered && setSelectedMcq(prev => ({ ...prev, [q.id]: idx }))}
                className={btnClass}
                disabled={isAnswered}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                {isAnswered && idx === q.correctIndex && <i className="fas fa-check-circle absolute right-3 top-4 text-green-600"></i>}
                {isAnswered && idx === selected && idx !== q.correctIndex && <i className="fas fa-times-circle absolute right-3 top-4 text-red-600"></i>}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={`p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-bold mb-1">{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</p>
            <p><span className="font-semibold">Giải thích:</span> {q.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  // Helper render True/False
  const renderTrueFalse = (q: TrueFalseQuestion) => {
    const isChecked = tfChecked[q.id];

    return (
      <div key={q.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex gap-3 mb-4">
          <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-sm h-fit whitespace-nowrap">Đúng/Sai</span>
          <p className="font-medium text-slate-800 text-lg">{q.mainQuestion}</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
              <tr>
                <th className="px-4 py-3">Ý</th>
                <th className="px-4 py-3">Nội dung</th>
                <th className="px-4 py-3 text-center w-24">Đúng</th>
                <th className="px-4 py-3 text-center w-24">Sai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {q.statements.map((stmt) => {
                const key = `${q.id}-${stmt.id}`;
                const userVal = tfAnswers[key];
                
                return (
                  <tr key={stmt.id} className="bg-white">
                    <td className="px-4 py-3 font-bold text-center text-slate-500">{stmt.id}</td>
                    <td className="px-4 py-3 text-slate-800">
                      {stmt.text}
                      {isChecked && (
                         <div className={`mt-1 text-xs font-semibold ${userVal === stmt.isTrue ? 'text-green-600' : 'text-red-600'}`}>
                           {userVal === stmt.isTrue ? '✓ Chính xác' : `✗ Sai. Đáp án là ${stmt.isTrue ? 'Đúng' : 'Sai'}`}
                           {stmt.explanation && <span className="block font-normal text-slate-500 mt-1">GT: {stmt.explanation}</span>}
                         </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="radio" 
                        name={key} 
                        checked={userVal === true}
                        onChange={() => !isChecked && setTfAnswers(prev => ({...prev, [key]: true}))}
                        disabled={isChecked}
                        className="w-5 h-5 text-teal-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="radio" 
                        name={key} 
                        checked={userVal === false}
                        onChange={() => !isChecked && setTfAnswers(prev => ({...prev, [key]: false}))}
                        disabled={isChecked}
                        className="w-5 h-5 text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {!isChecked && (
          <button 
            onClick={() => setTfChecked(prev => ({...prev, [q.id]: true}))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
          >
            Kiểm tra đáp án
          </button>
        )}
      </div>
    );
  };

  // Helper render Application
  const renderApplication = (app: RealWorldApplication, idx: number) => {
    return (
      <div key={idx} className="bg-white rounded-xl shadow-lg border-l-8 border-teal-500 overflow-hidden mb-8">
         <div className="bg-gradient-to-r from-teal-50 to-white p-6 border-b border-teal-100">
            <h3 className="text-xl font-bold text-teal-800 flex items-center gap-3">
              <span className="p-2 bg-teal-200 rounded-lg text-teal-700"><i className="fas fa-city"></i></span>
              {app.title}
            </h3>
         </div>
         <div className="p-6 md:p-8">
            <div className="prose prose-slate max-w-none text-slate-700 mb-6 text-lg">
               {app.content}
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
               <h4 className="text-yellow-800 font-bold mb-3 flex items-center gap-2">
                 <i className="fas fa-lightbulb"></i> Lời giải tham khảo
               </h4>
               <div className="text-slate-800 whitespace-pre-line leading-relaxed">
                 {app.solution}
               </div>
            </div>
         </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto h-full bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-teal-600 font-semibold text-xs md:text-sm bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 mb-3">
            <i className="fas fa-layer-group"></i> {chapter.title}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            {lesson.title}
          </h2>
          <div className="h-1 w-20 bg-teal-500 mt-4 rounded-full"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto gap-2 md:gap-6 hide-scrollbar pb-1">
          <button
            onClick={() => setActiveTab('theory')}
            className={`pb-3 px-2 font-semibold text-sm md:text-base transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'theory'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-book"></i> Lý thuyết
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`pb-3 px-2 font-semibold text-sm md:text-base transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'examples'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-lightbulb"></i> Ví dụ
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`pb-3 px-2 font-semibold text-sm md:text-base transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'exercises'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-pen-nib"></i> Tự luận
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`pb-3 px-2 font-semibold text-sm md:text-base transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-check-square"></i> Trắc nghiệm
          </button>
          <button
            onClick={() => setActiveTab('application')}
            className={`pb-3 px-2 font-semibold text-sm md:text-base transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'application'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-rocket"></i> Vận dụng
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {activeTab === 'theory' && (
            <div className="animate-fade-in space-y-2">
              {lesson.content.theory.map((item, idx) => renderTheoryItem(item, idx))}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-6 animate-fade-in">
              {lesson.content.examples.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                  <i className="fas fa-box-open text-4xl mb-3"></i>
                  <p>Chưa có ví dụ cho bài học này.</p>
                </div>
              ) : (
                lesson.content.examples.map((ex, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-gradient-to-r from-slate-50 to-white p-4 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-bold text-teal-700 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                          {idx + 1}
                        </span>
                        Ví dụ mẫu
                      </h4>
                    </div>
                    <div className="p-6">
                      <p className="font-semibold text-slate-800 text-lg mb-4 leading-relaxed font-serif">
                        {ex.problem}
                      </p>
                      <div className="relative">
                         <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-200"></div>
                         <div className="pl-8 py-2">
                            <span className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-2 block">Lời giải chi tiết:</span>
                            <div className="text-slate-600 leading-7 whitespace-pre-line">
                              {ex.solution}
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'exercises' && (
            <div className="grid grid-cols-1 gap-6 animate-fade-in">
              {lesson.content.exercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                  <i className="fas fa-clipboard-question text-4xl mb-3"></i>
                  <p>Chưa có bài tập tự luận cho bài học này.</p>
                </div>
              ) : (
                lesson.content.exercises.map((ex) => (
                  <div key={ex.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:border-teal-300 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <span className="bg-teal-600 text-white font-bold text-sm w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
                          {ex.id}
                        </span>
                      </div>
                      <div className="flex-1">
                         <h5 className="text-slate-800 font-medium text-lg mb-3">{ex.question}</h5>
                         {ex.hint && (
                           <div className="mb-3 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md inline-block">
                             <i className="fas fa-lightbulb mr-1"></i> Gợi ý: {ex.hint}
                           </div>
                         )}
                         
                         <details className="group mt-2">
                            <summary className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors select-none">
                              <span>Xem đáp án</span>
                              <i className="fas fa-chevron-down transition-transform group-open:rotate-180"></i>
                            </summary>
                            <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium animate-fade-in">
                               <span className="text-teal-600 mr-2"><i className="fas fa-check-circle"></i> Kết quả:</span>
                               {ex.answer}
                            </div>
                         </details>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="animate-fade-in">
              {(!lesson.content.mcqs || lesson.content.mcqs.length === 0) && (!lesson.content.trueFalseQs || lesson.content.trueFalseQs.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                   <i className="fas fa-tasks text-4xl mb-3"></i>
                   <p>Đang cập nhật câu hỏi trắc nghiệm...</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-teal-500 pl-4">A. Trắc nghiệm 4 lựa chọn</h3>
                  {lesson.content.mcqs?.map(q => renderMCQ(q))}
                  
                  {lesson.content.trueFalseQs && lesson.content.trueFalseQs.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-slate-800 mt-12 mb-6 border-l-4 border-blue-500 pl-4">B. Trắc nghiệm Đúng/Sai</h3>
                      {lesson.content.trueFalseQs.map(q => renderTrueFalse(q))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'application' && (
             <div className="animate-fade-in">
               {(!lesson.content.applications || lesson.content.applications.length === 0) ? (
                 <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                    <i className="fas fa-hard-hat text-4xl mb-3"></i>
                    <p>Chưa có nội dung vận dụng cho bài học này.</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 gap-8">
                    {lesson.content.applications.map((app, idx) => renderApplication(app, idx))}
                 </div>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;