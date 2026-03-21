import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { RefreshCw } from 'lucide-react';

interface AdminPanelProps {
  scriptUrl: string;
  onUpdateScriptUrl: (url: string) => void;
}

export function AdminPanel({ scriptUrl, onUpdateScriptUrl }: AdminPanelProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempUrl, setTempUrl] = useState(scriptUrl);

  const fetchData = async () => {
    if (!scriptUrl) {
      setError('Please configure your Google Apps Script Web App URL first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(scriptUrl);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scriptUrl) {
      fetchData();
    }
  }, [scriptUrl]);

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scriptUrl">Google Apps Script Web App URL</Label>
              <div className="flex gap-2">
                <Input
                  id="scriptUrl"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                />
                <Button onClick={() => onUpdateScriptUrl(tempUrl)}>Save</Button>
              </div>
              <p className="text-sm text-gray-500">
                This URL is used to save and retrieve predictions from your Google Sheet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Saved Predictions</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading || !scriptUrl}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{error}</div>}
          
          {!scriptUrl ? (
            <div className="text-center py-8 text-gray-500">
              Configure your Web App URL to view saved predictions.
            </div>
          ) : data.length === 0 && !loading ? (
            <div className="text-center py-8 text-gray-500">
              No predictions found in the Google Sheet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">DOB</th>
                    <th className="px-6 py-3">Life Path</th>
                    <th className="px-6 py-3">Destiny</th>
                    <th className="px-6 py-3">Careers</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{new Date(row.Timestamp || row.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{row.Name || row.name}</td>
                      <td className="px-6 py-4">{row.DOB || row.dob}</td>
                      <td className="px-6 py-4">{row.LifePath || row.lifePath}</td>
                      <td className="px-6 py-4">{row.Destiny || row.destiny}</td>
                      <td className="px-6 py-4 max-w-xs truncate" title={row.Careers || row.careers}>
                        {row.Careers || row.careers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
