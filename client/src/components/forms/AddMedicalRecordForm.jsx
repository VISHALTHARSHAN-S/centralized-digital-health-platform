import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { recordService } from '../../services/recordService';
import useNotifications from '../../hooks/useNotifications';

const AddMedicalRecordForm = ({ patientId, onSuccess, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        patientId,
        symptoms: data.symptoms ? data.symptoms.split(',').map(s => s.trim()) : []
      };
      await recordService.createRecord(payload);
      showSuccess('Medical Record created successfully!');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      showError(err.message || 'Failed to create medical record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Record Title"
        placeholder="e.g. Annual Diabetes Screening & Checkup"
        {...register('title', { required: 'Record title is required' })}
        error={errors.title?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Record Category"
          options={['Diagnosis', 'Lab Test', 'Scan', 'Discharge Summary']}
          {...register('recordType', { required: 'Record type required' })}
          error={errors.recordType?.message}
        />
        <Input
          label="Primary Diagnosis"
          placeholder="e.g. Stage 1 Essential Hypertension"
          {...register('diagnosis', { required: 'Diagnosis is required' })}
          error={errors.diagnosis?.message}
        />
      </div>

      <Input
        label="Symptoms (Comma Separated)"
        placeholder="e.g. Headache, Fatigue, Dizziness"
        {...register('symptoms')}
      />

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
          Clinical Notes & Observations
        </label>
        <textarea
          rows={3}
          className="w-full rounded-card border border-slate-300 p-3 text-sm text-slate-800 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          placeholder="Enter detailed clinical findings, dietary advice, or progress comments..."
          {...register('clinicalNotes')}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={loading}>
          Save Medical Record
        </Button>
      </div>
    </form>
  );
};

export default AddMedicalRecordForm;
