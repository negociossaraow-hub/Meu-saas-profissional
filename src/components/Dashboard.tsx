import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold mb-4">{t('dashboard')}</h1>
        <p className="text-xl opacity-70">{t('heroSubtitle')}</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">{t('feature1')}</h3>
          <div className="h-32 bg-indigo-900/30 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">{t('feature2')}</h3>
          <div className="h-32 bg-indigo-900/30 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">{t('feature3')}</h3>
          <div className="h-32 bg-indigo-900/30 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
