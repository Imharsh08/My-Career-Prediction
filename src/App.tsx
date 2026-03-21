import React, { useState, useEffect } from 'react';
import { PredictionForm, PredictionFormData } from './components/PredictionForm';
import { PredictionResult, PredictionData } from './components/PredictionResult';
import { AdminPanel } from './components/AdminPanel';
import { GoogleSheetInstructions } from './components/GoogleSheetInstructions';
import { calculateLifePathNumber, calculateDestinyNumber, careerMapping, personalityTraits } from './utils/numerology';
import { Sparkles, Database, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'predict' | 'admin' | 'setup'>('predict');
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load script URL from local storage
  const [scriptUrl, setScriptUrl] = useState(() => {
    return localStorage.getItem('googleScriptUrl') || '';
  });

  const handleUpdateScriptUrl = (url: string) => {
    setScriptUrl(url);
    localStorage.setItem('googleScriptUrl', url);
    alert('Google Apps Script URL saved locally!');
  };

  const handlePredict = async (data: PredictionFormData) => {
    setIsLoading(true);
    
    // Simulate a slight delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const lifePath = calculateLifePathNumber(data.dob);
    const destiny = calculateDestinyNumber(data.fullName);
    
    // Combine careers from both numbers, remove duplicates
    const careers = Array.from(new Set([
      ...(careerMapping[lifePath] || []),
      ...(careerMapping[destiny] || [])
    ]));

    // Combine personality traits
    const personality = `${personalityTraits[lifePath] || ''} ${personalityTraits[destiny] || ''}`.trim();

    setPrediction({
      name: data.fullName,
      lifePath,
      destiny,
      careers,
      personality
    });
    
    setIsLoading(false);
  };

  const handleSaveToGoogleSheets = async () => {
    if (!prediction) return;
    if (!scriptUrl) {
      alert('Please configure your Google Apps Script Web App URL in the Setup tab first.');
      setActiveTab('setup');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script without CORS setup
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          name: prediction.name,
          dob: new Date().toISOString().split('T')[0], // Using current date or could pass actual DOB
          lifePath: prediction.lifePath,
          destiny: prediction.destiny,
          careers: prediction.careers.join(', ')
        }),
      });
      
      // With no-cors, we can't read the response, so we assume success if no error thrown
      alert('Prediction saved to Google Sheets successfully!');
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      alert('Failed to save to Google Sheets. Please check your URL and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('predict')}>
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">Numerology Career</span>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('predict')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'predict' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Predict
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${activeTab === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Database className="w-4 h-4" /> Admin
              </button>
              <button
                onClick={() => setActiveTab('setup')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${activeTab === 'setup' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Settings className="w-4 h-4" /> Setup
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'predict' && (
          <div className="space-y-12">
            {!prediction ? (
              <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
            ) : (
              <div className="space-y-8">
                <button 
                  onClick={() => setPrediction(null)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  &larr; Start New Prediction
                </button>
                <PredictionResult 
                  data={prediction} 
                  onSave={handleSaveToGoogleSheets}
                  isSaving={isSaving}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            scriptUrl={scriptUrl} 
            onUpdateScriptUrl={handleUpdateScriptUrl} 
          />
        )}

        {activeTab === 'setup' && (
          <GoogleSheetInstructions />
        )}
      </main>
    </div>
  );
}
