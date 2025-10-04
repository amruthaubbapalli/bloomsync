import React, { useState, useCallback } from 'react';
import type { AnalysisResult, Recommendation } from '../../types';
import { generateRecommendations, generateStory } from '../../services/geminiService';
import Card from '../common/Card';
import Spinner from '../common/Spinner';
import Icon from '../common/Icon';

interface AlertsViewProps {
  analysisResult: AnalysisResult | null;
}

const AlertsView: React.FC<AlertsViewProps> = ({ analysisResult }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [story, setStory] = useState<string>('');
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!analysisResult?.mismatchDetails) return;
    setIsLoadingRecs(true);
    setError(null);
    try {
      const recs = await generateRecommendations(analysisResult.mismatchDetails);
      setRecommendations(recs);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingRecs(false);
    }
  }, [analysisResult]);

  const fetchStory = useCallback(async () => {
    if (!analysisResult?.mismatchDetails) return;
    setIsLoadingStory(true);
    setError(null);
    try {
      const narrative = await generateStory(analysisResult.mismatchDetails);
      setStory(narrative);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingStory(false);
    }
  }, [analysisResult]);
  
  if (!analysisResult || !analysisResult.isMismatch) {
    return (
        <div className="space-y-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Alerts
            </h1>
            <Card>
                <div className="flex flex-col items-center justify-center p-8">
                    <Icon name="check" className="h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">No Active Alerts</h2>
                    <p className="mt-2 max-w-md text-gray-600">
                        Currently, there are no mismatch alerts to display. Use the Home page to analyze a new scenario.
                    </p>
                </div>
            </Card>
        </div>
    );
  }

  const severityStyles = {
    high: { icon: 'warning', color: 'red', text: 'High' },
    medium: { icon: 'warning', color: 'yellow', text: 'Medium' },
    low: { icon: 'warning', color: 'blue', text: 'Low' },
    none: { icon: 'check', color: 'green', text: 'None' },
  };

  const currentSeverity = severityStyles[analysisResult.severity] || severityStyles.low;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Mismatch <span className={`text-${currentSeverity.color}-500`}>Alert</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          A potential disruption in ecological synchrony has been detected. Review the details and recommended actions below.
        </p>
      </div>

      <Card>
        <div className={`p-4 bg-${currentSeverity.color}-100 border-l-4 border-${currentSeverity.color}-500 rounded-md mb-6`}>
            <div className="flex items-center">
                <Icon name={currentSeverity.icon as 'warning' | 'check'} className={`h-8 w-8 text-${currentSeverity.color}-500 mr-4`}/>
                <div>
                    <p className={`text-lg font-bold text-${currentSeverity.color}-800`}>Severity: {currentSeverity.text}</p>
                    <p className={`text-md text-${currentSeverity.color}-700`}>{analysisResult.mismatchDetails}</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold text-green-800">Flowering Peak</h3>
                <p className="text-lg text-green-700">{analysisResult.floweringPeak}</p>
            </div>
            <div className="bg-amber-100 p-4 rounded-lg">
                <h3 className="font-bold text-amber-800">Pollinator Peak</h3>
                <p className="text-lg text-amber-700">{analysisResult.pollinatorPeak}</p>
            </div>
        </div>
      </Card>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-bold mb-4">Recommended Actions</h2>
          {!recommendations.length && !isLoadingRecs && (
            <div className="text-center">
                <p className="mb-4">Generate AI-powered recommendations for farmers, conservationists, and the community.</p>
                <button onClick={fetchRecommendations} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                    Generate Recommendations
                </button>
            </div>
          )}
          {isLoadingRecs && <div className="flex justify-center"><Spinner /></div>}
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rec.category === 'Farming' ? 'bg-green-200 text-green-800' : rec.category === 'Conservation' ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'}`}>{rec.category}</span>
                <h3 className="font-bold mt-2">{rec.title}</h3>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4">Story Mode</h2>
          {!story && !isLoadingStory && (
             <div className="text-center">
                <p className="mb-4">Understand the impact through a compelling narrative.</p>
                <button onClick={fetchStory} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                    Generate Story
                </button>
            </div>
          )}
          {isLoadingStory && <div className="flex justify-center"><Spinner /></div>}
          {story && <p className="text-gray-700 italic whitespace-pre-wrap">{story}</p>}
        </Card>
      </div>

    </div>
  );
};

export default AlertsView;