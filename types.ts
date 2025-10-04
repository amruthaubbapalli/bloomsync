export type View = 'home' | 'graph' | 'alerts';

export interface FormData {
  flower: string;
  season: string;
  location: string;
  pollinator: string;
}

export interface AnalysisResult {
  isMismatch: boolean;
  mismatchDetails: string;
  floweringPeak: string;
  pollinatorPeak: string;
  severity: 'low' | 'medium' | 'high' | 'none';
}

export interface Recommendation {
  title: string;
  description: string;
  category: 'Farming' | 'Conservation' | 'Community';
}

export interface GraphDataPoint {
  month: string;
  bloomIntensity: number;
  pollinatorActivity: number;
}