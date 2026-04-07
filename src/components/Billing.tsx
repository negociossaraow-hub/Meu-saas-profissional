import React from 'react';
import { useTranslation } from 'react-i18next';

interface BillingProps {
  plan: string;
}

const Billing: React.FC<BillingProps> = ({ plan }) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-gray-800 rounded-xl text-white shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t('subscribe')} {plan}
      </h2>
      <div className="space-y-4">
        <p className="text-center opacity-80">{t('billing')}</p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-bold transition-all">
          {t('subscribe')}
        </button>
      </div>
    </div>
  );
};

export default Billing;
