import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointmentService';
import AppointmentTable from '../../components/tables/AppointmentTable';
import Modal from '../../components/common/Modal';
import AppointmentBookingForm from '../../components/forms/AppointmentBookingForm';
import Button from '../../components/ui/Button';
import { Plus, CalendarCheck } from 'lucide-react';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const loadAppointments = () => {
    setLoading(true);
    appointmentService.getMyAppointments()
      .then(res => {
        if (res.data) setAppointments(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-card border border-slate-200 shadow-card-soft">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Doctor Consultations & Appointments</h1>
          <p className="text-xs text-slate-500 mt-0.5">Schedule specialist consultations across empaneled network hospitals</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setIsBookOpen(true)}>
          Book Doctor Consultation
        </Button>
      </div>

      <AppointmentTable appointments={appointments} role="PATIENT" />

      <Modal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} title="Book New Specialist Consultation">
        <AppointmentBookingForm onSuccess={loadAppointments} onClose={() => setIsBookOpen(false)} />
      </Modal>
    </div>
  );
};

export default PatientAppointments;
