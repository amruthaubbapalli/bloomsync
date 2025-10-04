
import React from 'react';
import Card from '../common/Card';

const MapView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Global Mismatch <span className="text-red-500">Hotspots</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          This map highlights regions where the timing between flowering and pollinator activity is critically desynchronized, posing a risk to local ecosystems and agriculture.
        </p>
      </div>

      <Card>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/bloommap/1200/600" 
            alt="Global Mismatch Hotspots Map" 
            className="rounded-lg object-cover w-full h-auto"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex flex-col items-center justify-center p-4 text-white">
            <h2 className="text-2xl md:text-4xl font-bold">Conceptual Map Visualization</h2>
            <p className="mt-2 text-center max-w-xl">
              Data from Sentinel-2, Landsat, and citizen science networks are combined to identify these critical zones. Red areas indicate a high probability of mismatch. (This is a placeholder image for demonstration).
            </p>
          </div>
        </div>
         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-red-100 rounded-lg">
                <h3 className="font-bold text-red-800">High Risk</h3>
                <p className="text-sm text-red-700">>15 day gap between peaks</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg">
                <h3 className="font-bold text-yellow-800">Medium Risk</h3>
                <p className="text-sm text-yellow-700">5-15 day gap between peaks</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
                <h3 className="font-bold text-green-800">Low Risk</h3>
                <p className="text-sm text-green-700"><5 day gap between peaks</p>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default MapView;
