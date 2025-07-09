import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import LinkAuditReport from '../components/LinkAuditReport';

const LinkAuditPage: React.FC = () => {
  return (
    <div className="lg:ml-64 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="container mx-auto">
          <Link
            to="/admin"
            className="inline-flex items-center space-x-2 text-dark-gray hover:text-light-pink transition-colors duration-300 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Admin</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-light-pink rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl font-bold text-dark-gray">
                Link Audit Report
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive testing of all navigation links across the website
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <LinkAuditReport />
      </div>
    </div>
  );
};

export default LinkAuditPage;