import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import HealthCard from '../../components/cards/HealthCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';

const HealthCardView = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientService.getProfile()
      .then(res => {
        if (res.data) setPatient(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8"><CardSkeleton /></div>;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-card-soft text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">Digital Health ID Credentials</h1>
        <p className="text-xs text-slate-500">
          Official Government Digital Healthcare Identity Card. Show this card or scan QR code at any empaneled clinic or hospital for instant medical record access.
        </p>
      </div>

      <HealthCard patient={patient} />
    </div>
  );
};

export default HealthCardView;
