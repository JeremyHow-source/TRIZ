export interface TrizParameter {
  id: number;
  nameEn: string;
  nameZh: string;
  pinyinZh?: string;
}

export interface TrizPrinciple {
  id: number;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  examplesEn: string[];
  examplesZh: string[];
}

export interface StandardSolution {
  id: string; // e.g., "1.1.1"
  classId: number;
  classNameEn: string;
  classNameZh: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
}

export interface TrizEffect {
  id: string;
  domain: string;
  functionEn: string;
  functionZh: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  examplesEn: string[];
  examplesZh: string[];
}

export type TrizLanguage = 'en' | 'zh';
