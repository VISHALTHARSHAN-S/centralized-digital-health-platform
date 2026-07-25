import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { prescriptionService } from '../../services/prescriptionService';
import useNotifications from '../../hooks/useNotifications';

const PrescriptionForm = ({ patientId, onSuccess, onClose }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications'
  });

  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await prescriptionService.createPrescription({ ...data, patientId });
      showSuccess('Prescription issued successfully!');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      showError(err.message || 'Failed to issue prescription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Diagnosis Summary"
        placeholder="e.g. Acute Upper Respiratory Tract Infection"
        {...register('diagnosisSummary', { required: 'Diagnosis summary is required' })}
        error={errors.diagnosisSummary?.message}
      />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Medications List
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={Plus}
            onClick={() => append({ name: '', dosage: '', frequency: '', duration: '', instructions: '' })}
          >
            Add Medication
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="p-3 bg-slate-50 border border-slate-200 rounded-card relative space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input
                placeholder="Medicine Name (e.g. Amoxicillin)"
                {...register(`medications.${index}.name`, { required: 'Name required' })}
              />
              <Input
                placeholder="Dosage (e.g. 500mg)"
                {...register(`medications.${index}.dosage`, { required: 'Dosage required' })}
              />
              <Input
                placeholder="Frequency (e.g. Twice Daily)"
                {...register(`medications.${index}.frequency`, { required: 'Frequency required' })}
              />
              <Input
                placeholder="Duration (e.g. 5 Days)"
                {...register(`medications.${index}.duration`, { required: 'Duration required' })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Special Instructions (e.g. Take with warm water after meals)"
                {...register(`medications.${index}.instructions`)}
                className="text-xs"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Dietary / Lifestyle Advice"
          placeholder="e.g. Hydrate well, avoid cold beverages"
          {...register('dietaryInstructions')}
        />
        <Input
          label="Follow-Up Date"
          type="date"
          {...register('followUpDate')}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={loading}>
          Issue Prescription
        </Button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
