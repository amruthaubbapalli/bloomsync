import { GraphDataPoint, View } from './types';

export const NAV_ITEMS: { label: string; view: View }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Synchrony Graphs', view: 'graph' },
  { label: 'Alerts', view: 'alerts' },
];

export const MOCK_GRAPH_DATA_SYNC: GraphDataPoint[] = [
    { month: 'Mar', bloomIntensity: 10, pollinatorActivity: 8 },
    { month: 'Apr', bloomIntensity: 40, pollinatorActivity: 35 },
    { month: 'May', bloomIntensity: 80, pollinatorActivity: 85 },
    { month: 'Jun', bloomIntensity: 60, pollinatorActivity: 65 },
    { month: 'Jul', bloomIntensity: 20, pollinatorActivity: 25 },
    { month: 'Aug', bloomIntensity: 5, pollinatorActivity: 10 },
];

export const MOCK_GRAPH_DATA_MISMATCH: GraphDataPoint[] = [
    { month: 'Mar', bloomIntensity: 40, pollinatorActivity: 5 },
    { month: 'Apr', bloomIntensity: 85, pollinatorActivity: 15 },
    { month: 'May', bloomIntensity: 50, pollinatorActivity: 60 },
    { month: 'Jun', bloomIntensity: 15, pollinatorActivity: 80 },
    { month: 'Jul', bloomIntensity: 5, pollinatorActivity: 40 },
    { month: 'Aug', bloomIntensity: 0, pollinatorActivity: 10 },
];