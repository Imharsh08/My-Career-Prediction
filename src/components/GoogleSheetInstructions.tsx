import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export function GoogleSheetInstructions() {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>How to Setup Google Sheets Database</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900">1. Create a Google Sheet</h3>
          <p>Create a new Google Sheet and add the following headers in the first row (A1 to F1):</p>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md font-mono text-sm">
            <li>Timestamp</li>
            <li>Name</li>
            <li>DOB</li>
            <li>LifePath</li>
            <li>Destiny</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900">2. Add Apps Script</h3>
          <p>Go to <strong>Extensions &gt; Apps Script</strong> and paste the following code:</p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (data.action === 'create') {
    sheet.appendRow([
      new Date(), 
      data.name, 
      data.dob, 
      data.lifePath, 
      data.destiny, 
      data.careers
    ]);
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    result.push(row);
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900">3. Deploy as Web App</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click <strong>Deploy &gt; New deployment</strong> in the top right.</li>
            <li>Select type: <strong>Web app</strong>.</li>
            <li>Execute as: <strong>Me</strong>.</li>
            <li>Who has access: <strong>Anyone</strong>.</li>
            <li>Click <strong>Deploy</strong> and authorize the script.</li>
            <li>Copy the <strong>Web app URL</strong> and paste it into the Admin Settings tab in this app.</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
