
import React, { useState } from 'react';
import type { FormData, AnalysisResult } from '../../types';
import Spinner from '../common/Spinner';
import Card from '../common/Card';
import Icon from '../common/Icon';

interface HomeViewProps {
  onAnalyze: (formData: FormData) => void;
  isLoading: boolean;
  error: string | null;
  analysisResult: AnalysisResult | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onAnalyze, isLoading, error, analysisResult }) => {
  const [formData, setFormData] = useState<FormData>({
    flower: 'Cherry Blossoms',
    season: 'Spring',
    location: 'Kyoto, Japan',
    pollinator: 'Honeybee',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Welcome to <span className="text-emerald-600">BloomSync</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Analyzing the delicate dance between flowers and pollinators in a changing climate. Enter details below to assess the ecological synchrony in your region.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="flower" className="block text-sm font-medium text-gray-700">Flower Species</label>
              <input type="text" name="flower" id="flower" value={formData.flower} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="pollinator" className="block text-sm font-medium text-gray-700">Primary Pollinator</label>
              <input type="text" name="pollinator" id="pollinator" value={formData.pollinator} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g., City, Region)</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="season" className="block text-sm font-medium text-gray-700">Season</label>
               <select name="season" id="season" value={formData.season} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" required>
                <option>Spring</option>
                <option>Summer</option>
                <option>Autumn</option>
                <option>Winter</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" disabled={isLoading} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isLoading ? <Spinner /> : 'Analyze Synchrony'}
            </button>
          </div>
        </form>
      </Card>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {analysisResult && !analysisResult.isMismatch && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
           <div className="flex items-center">
             <Icon name="check" className="h-6 w-6 mr-3"/>
             <div>
                <p className="font-bold">Synchrony Stable</p>
                <p>{analysisResult.mismatchDetails}</p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
