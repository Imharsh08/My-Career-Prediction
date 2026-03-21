import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Download, Share2, Save, Youtube, MessageCircle } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export interface PredictionData {
  name: string;
  lifePath: number;
  destiny: number;
  careers: string[];
  personality: string;
}

interface PredictionResultProps {
  data: PredictionData;
  onSave: () => void;
  isSaving: boolean;
}

export function PredictionResult({ data, onSave, isSaving }: PredictionResultProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const getYoutubeLink = (career: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(`how to grow in ${career} podcast OR masterclass video -shorts`)}`;
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      // Use html-to-image which natively supports modern CSS like oklch
      const dataUrl = await toPng(reportRef.current, { 
        quality: 1.0,
        pixelRatio: 2, // Higher resolution
        backgroundColor: '#ffffff'
      });
      
      const width = reportRef.current.offsetWidth;
      const height = reportRef.current.offsetHeight;
      
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [width, height]
      });
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
      
      // Make links clickable in the PDF by mapping HTML link coordinates to the PDF
      const containerRect = reportRef.current.getBoundingClientRect();
      const links = reportRef.current.querySelectorAll('a');
      
      links.forEach(link => {
        const rect = link.getBoundingClientRect();
        const x = rect.left - containerRect.left;
        const y = rect.top - containerRect.top;
        const url = link.getAttribute('href');
        if (url) {
          pdf.link(x, y, rect.width, rect.height, { url });
        }
      });
      
      pdf.save(`${data.name.replace(/\s+/g, '_')}_Career_Prediction.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleShare = () => {
    const careerLinks = data.careers
      .map(c => `- ${c}: ${getYoutubeLink(c)}`)
      .join('\n');
      
    const text = `🔮 Check out my Numerology Career Prediction!\n\n🔢 Life Path: ${data.lifePath}\n🌟 Destiny: ${data.destiny}\n\n💼 Top Careers & Podcasts/Masterclasses:\n${careerLinks}\n\n📱 My Social Media Growth Focus:\n- Curating my feed for ${data.careers[0]}\n- Engaging with ${data.careers[1] || data.careers[0]} content\n\nDiscover your path too!`;
    
    // Direct WhatsApp share link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div ref={reportRef} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Numerology Report</h2>
          <p className="text-gray-500">Prepared for {data.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-lg text-center">
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Life Path Number</h3>
            <div className="text-5xl font-bold text-indigo-900">{data.lifePath}</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-lg text-center">
            <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">Destiny Number</h3>
            <div className="text-5xl font-bold text-emerald-900">{data.destiny}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personality Insights</h3>
            <p className="text-gray-700 leading-relaxed">{data.personality}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Recommended Career Paths</h3>
            <div className="flex flex-col gap-3">
              {data.careers.map((career, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-800">{career}</span>
                  <a 
                    href={getYoutubeLink(career)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <Youtube className="w-4 h-4" /> Podcast / Masterclass
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">📱 Social Media Feed Optimization</h3>
            <p className="text-blue-800 mb-4 text-sm">Train your algorithm to serve your Destiny Number ({data.destiny}) goals. Here is your action plan:</p>
            <ul className="space-y-3 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span><strong>Curate your timeline:</strong> Search for "how to grow in {data.careers[0]}" on YouTube and subscribe to the top 3 channels. Unfollow 5 accounts that distract you.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span><strong>Engage intentionally:</strong> Spend 15 minutes daily on LinkedIn or Twitter leaving meaningful comments on posts related to <strong>{data.careers[1] || data.careers[0]}</strong> to build your network.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span><strong>Algorithm training:</strong> Watch at least one of the long-form masterclasses linked above every week. Liking and saving this educational content will shift your feed from entertainment to growth.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
          <MessageCircle className="w-4 h-4" /> Share to WhatsApp
        </Button>
        <Button onClick={onSave} disabled={isSaving} className="flex items-center gap-2">
          <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save to Google Sheets'}
        </Button>
      </div>
    </div>
  );
}
