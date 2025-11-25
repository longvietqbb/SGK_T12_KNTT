
export interface Example {
  problem: string;
  solution: string;
}

export interface Exercise {
  id: number;
  question: string;
  hint?: string;
  answer: string;
}

// Trắc nghiệm 4 lựa chọn (Multiple Choice Question)
export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: string[]; // [A, B, C, D]
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
}

// Trắc nghiệm đúng sai (Compound True/False - Format mới 2025)
export interface TrueFalseStatement {
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
  isTrue: boolean;
  explanation?: string;
}

export interface TrueFalseQuestion {
  id: number;
  mainQuestion: string; // Câu dẫn
  statements: TrueFalseStatement[];
}

// Ứng dụng thực tế
export interface RealWorldApplication {
  title: string;
  content: string;
  solution: string;
}

export interface TheoryItem {
  type: 'definition' | 'theorem' | 'note' | 'method' | 'text';
  title?: string;
  content: string; // HTML-like string or plain text
}

export interface LessonContent {
  theory: TheoryItem[]; 
  examples: Example[];
  exercises: Exercise[]; // Bài tập tự luận ngắn
  mcqs?: MultipleChoiceQuestion[]; // Trắc nghiệm ABCD
  trueFalseQs?: TrueFalseQuestion[]; // Trắc nghiệm Đúng/Sai
  applications?: RealWorldApplication[]; // Vận dụng thực tế
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
