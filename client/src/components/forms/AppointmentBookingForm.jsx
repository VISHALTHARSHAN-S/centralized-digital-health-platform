import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import useNotifications from '../../hooks/useNotifications';

const AppointmentBookingForm = ({ onSuccess, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    doctorService.getAllDoctors()
      .then(res => {
        if (res.data) setDoctors(res.data);
      })
      .catch(err => console.error('Failed to load doctors list:', err));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await appointmentService.bookAppointment(data);
      showSuccess('Appointment scheduled successfully!');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      showError(err.message || 'Failed to schedule appointment');
    } finally {
      setLoading(false);
    }
  };

  const doctorOptions = doctors.map(d => ({
    value: d._id,
    label: `${d.fullName} - ${d.specialization} (${d.hospitalId?.name || 'Hospital'})`
  }));

  const timeSlotOptions = [
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '03:30 PM - 04:00 PM'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Select Specialist Doctor"
        options={doctorOptions}
        placeholder="Choose Doctor & Specialization"
        {...register('doctorId', { required: 'Please select a doctor' })}
        error={errors.doctorId?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Preferred Appointment Date"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          {...register('appointmentDate', { required: 'Appointment date required' })}
          error={errors.appointmentDate?.message}
        />
        <Select
          label="Available Time Slot"
          options={timeSlotOptions}
          {...register('timeSlot', { required: 'Select a time slot' })}
          error={errors.timeSlot?.message}
        />
      </div>

      <Input
        label="Reason for Visit / Symptoms"
        placeholder="e.g. Follow-up consultation for High Blood Pressure"
        {...register('reasonForVisit', { required: 'Reason for visit required' })}
        error={errors.reasonForVisit?.message}
      />

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={loading}>
          Confirm Appointment
        </Button>
      </div>
    </form>
  );
};

export default AppointmentBookingForm;
