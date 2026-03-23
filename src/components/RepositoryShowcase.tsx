import React from 'react';

interface Language {
  name: string;
  percent: number;
  color?: string;
}

interface RepositoryShowcaseProps {
  repoName: string;
  repoUrl: string;
  description: string;
  owner: string;
  languages: Language[];
  lastUpdated: string;
  stats: {
    stars: number;
    forks: number;
    openIssues: number;
  };
}

const RepositoryShowcase: React.FC<RepositoryShowcaseProps> = ({
  repoName,
  repoUrl,
  description,
  owner,
  languages,
  lastUpdated,
  stats,
}) => {
  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    React: '#61dafb',
    Other: '#858585',
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-gray-900">{repoName}</h2>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            View on GitHub
          </a>
        </div>
        <p className="text-gray-600 text-sm">by {owner}</p>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>

      {/* Language Composition */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Language Composition</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                <span className="text-sm font-semibold text-gray-900">{lang.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${lang.percent}%`,
                    backgroundColor: lang.color || languageColors[lang.name] || '#858585',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.stars}</div>
          <div className="text-sm text-gray-600">Stars</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.forks}</div>
          <div className="text-sm text-gray-600">Forks</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.openIssues}</div>
          <div className="text-sm text-gray-600">Open Issues</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
};

export default RepositoryShowcase;
