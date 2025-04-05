
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RoadmapStep {
  title: string;
  content: string;
}

export interface AIResponse {
  text: string;
  roadmap?: RoadmapStep[];
}

export type Language = 'english' | 'russian' | 'kazakh';

export const languageNames = {
  english: 'English',
  russian: 'Русский',
  kazakh: 'Қазақша'
};
