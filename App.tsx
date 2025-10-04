import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/views/HomeView';
import GraphView from './components/views/GraphView';
import AlertsView from './components/views/AlertsView';
import { View, AnalysisResult, FormData } from './types';
import { analyzeSynchrony } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeSynchrony(formData);
      setAnalysisResult(result);
      if (result.isMismatch) {
        setCurrentView('alerts');
      } else {
        // Stay on home view to show success message
        setCurrentView('home');
      }
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to analyze synchrony. The model may be unavailable or the request was blocked. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'graph':
        return <GraphView />;
      case 'alerts':
        return <AlertsView analysisResult={analysisResult} />;
      case 'home':
      default:
        return <HomeView onAnalyze={handleAnalysis} isLoading={isLoading} error={error} analysisResult={analysisResult} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-emerald-50">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;