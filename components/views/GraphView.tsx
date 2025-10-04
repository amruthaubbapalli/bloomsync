
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_GRAPH_DATA_SYNC, MOCK_GRAPH_DATA_MISMATCH } from '../../constants';
import Card from '../common/Card';

const GraphView: React.FC = () => {
    const [isMismatchView, setIsMismatchView] = useState(false);
    const data = isMismatchView ? MOCK_GRAPH_DATA_MISMATCH : MOCK_GRAPH_DATA_SYNC;
    const title = isMismatchView ? "Example of Mismatched Synchrony" : "Example of Healthy Synchrony";
    const description = isMismatchView 
        ? "Here, the flower bloom peaks significantly earlier than the pollinator activity, reducing pollination effectiveness."
        : "In this scenario, pollinator activity closely tracks the availability of floral resources, indicating a healthy, synchronized ecosystem.";


  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Phenological <span className="text-emerald-600">Synchrony Analysis</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Visualize the critical timing relationship between flowering events and pollinator activity.
        </p>
      </div>
      <Card>
        <div className="flex justify-center mb-6">
            <div className="bg-gray-200 rounded-full p-1 flex">
                <button onClick={() => setIsMismatchView(false)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${!isMismatchView ? 'bg-white text-emerald-700 shadow' : 'text-gray-600'}`}>
                    Healthy Synchrony
                </button>
                <button onClick={() => setIsMismatchView(true)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isMismatchView ? 'bg-white text-red-700 shadow' : 'text-gray-600'}`}>
                    Mismatched
                </button>
            </div>
        </div>
        <div className="text-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: 'Relative Activity / Intensity', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bloomIntensity" name="Flower Bloom Intensity" stroke="#34D399" strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="pollinatorActivity" name="Pollinator Activity" stroke="#FBBF24" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default GraphView;
