import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, Search, Filter } from 'lucide-react';
import { quickLinksAudit, runLinkAudit, LinkTest } from '../utils/linkAudit';

const LinkAuditReport: React.FC = () => {
  const [auditResults, setAuditResults] = useState<LinkTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'working' | 'broken' | 'redirect'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const performAudit = async () => {
      setIsLoading(true);
      const results = await runLinkAudit();
      setAuditResults(results);
      setIsLoading(false);
    };

    performAudit();
  }, []);

  const filteredResults = auditResults.filter(link => {
    const matchesFilter = filter === 'all' || link.status === filter;
    const matchesSearch = searchQuery === '' || 
      link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.component.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'broken':
        return <XCircle size={20} className="text-red-600" />;
      case 'redirect':
        return <AlertTriangle size={20} className="text-yellow-600" />;
      default:
        return <AlertTriangle size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working':
        return 'bg-green-100 text-green-800';
      case 'broken':
        return 'bg-red-100 text-red-800';
      case 'redirect':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: auditResults.length,
    working: auditResults.filter(l => l.status === 'working').length,
    broken: auditResults.filter(l => l.status === 'broken').length,
    redirect: auditResults.filter(l => l.status === 'redirect').length
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-pink mx-auto mb-4"></div>
        <p className="text-gray-600">Running link audit...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-dark-gray mb-2">Quick Links Audit Report</h1>
          <p className="text-gray-600">Comprehensive analysis of all navigation links across the website</p>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-600">Total Links</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.working}</div>
              <div className="text-sm text-green-600">Working</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.broken}</div>
              <div className="text-sm text-red-600">Broken</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.redirect}</div>
              <div className="text-sm text-yellow-600">Redirects</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-light-pink"
              >
                <option value="all">All Links</option>
                <option value="working">Working</option>
                <option value="broken">Broken</option>
                <option value="redirect">Redirects</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredResults.map((link) => (
              <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(link.status)}
                      <h3 className="font-semibold text-dark-gray">{link.label}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(link.status)}`}>
                        {link.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1"><strong>Path:</strong> {link.path}</p>
                        <p className="text-gray-600 mb-1"><strong>Component:</strong> {link.component}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1"><strong>Expected:</strong> {link.expectedDestination}</p>
                        <p className="text-gray-600"><strong>Actual:</strong> {link.actualBehavior}</p>
                      </div>
                    </div>
                    
                    {link.errorMessage && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <strong>Error:</strong> {link.errorMessage}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4">
                    <button
                      onClick={() => window.open(link.path, '_blank')}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Test link"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No links match your current filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkAuditReport;