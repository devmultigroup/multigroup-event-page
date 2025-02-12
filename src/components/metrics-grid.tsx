import { AfterMetrics } from '@/types';
import React, { useEffect, useState } from 'react';

type MetricItem = {
  key: keyof AfterMetrics;
  label: string;
  suffix: string;
};

const MetricsGrid = ({ afterMetrics }: { afterMetrics: AfterMetrics }) => {
  const [counts, setCounts] = useState<Record<keyof AfterMetrics, number>>({
    applications: 0,
    vipGuests: 0,
    supporter: 0,
    speakers: 0,
    workingParticipant: 0,
    jobSeeker: 0,
    jobProvider: 0,
    satisfaction: 0
  });

  const metricsData: MetricItem[] = [
    { key: 'applications', label: 'Başvuru', suffix: '' },
    { key: 'vipGuests', label: 'VIP Konuk', suffix: '+' },
    { key: 'supporter', label: 'Destekçi', suffix: '+' },
    { key: 'speakers', label: 'Konuşmacı', suffix: '' },
    { key: 'workingParticipant', label: 'Çalışan Katılımcı', suffix: '%' },
    { key: 'jobSeeker', label: 'İş Arayan', suffix: '%' },
    { key: 'jobProvider', label: 'İş Veren', suffix: '%' },
    { key: 'satisfaction', label: 'Memnuniyet', suffix: '%' }
  ];

  useEffect(() => {
    if (!afterMetrics) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const timers: NodeJS.Timeout[] = [];

    metricsData.forEach(({ key }) => {
      const rawValue = afterMetrics[key]?.replace(/\D/g, '') || '0';
      const targetValue = parseInt(rawValue, 10);

      if (isNaN(targetValue)) return;

      const increment = targetValue / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        setCounts(prev => ({
          ...prev,
          [key]: currentStep < steps ? Math.round(increment * currentStep) : targetValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }

        currentStep++;
      }, interval);

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [afterMetrics]);

  return (
    <div className="select-none w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metricsData.map(({ key, label, suffix }) => (
          <div
            key={key}
            className="bg-transparent backdrop-blur-sm rounded-lg p-6 text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {counts[key]}
              {suffix}
            </div>
            <div className="text-gray-900 text-sm uppercase tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
