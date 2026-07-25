import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { patientService } from '../../services/patientService';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import useNotifications from '../../hooks/useNotifications';
import { ShieldCheck, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    patientService.getProfile()
      .then(res => {
        if (res.data) {
          setProfile(res.data);
          reset({
            fullName: res.data.fullName,
            contactNumber: res.data.contactNumber,
            gender: res.data.gender,
            bloodGroup: res.data.bloodGroup,
            allergies: res.data.allergies?.join(', '),
            medicalHistory: res.data.medicalHistory?.join(', '),
            emergencyName: res.data.emergencyContact?.name,
            emergencyPhone: res.data.emergencyContact?.phone,
            emergencyRelation: res.data.emergencyContact?.relationship
          });
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        fullName: data.fullName,
        contactNumber: data.contactNumber,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        allergies: data.allergies ? data.allergies.split(',').map(s => s.trim()) : [],
        medicalHistory: data.medicalHistory ? data.medicalHistory.split(',').map(s => s.trim()) : [],
        emergencyContact: {
          name: data.emergencyName,
          phone: data.emergencyPhone,
          relationship: data.emergencyRelation
        }
      };

      const updated = await patientService.updateProfile(payload);
      setProfile(updated.data);
      showSuccess('Health profile updated successfully!');
    } catch (err) {
      showError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Profile...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-card border border-slate-200 shadow-card-soft">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">National Health ID Profile</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Government HID: <span className="font-bold text-amber-600">{profile?.healthId}</span></p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> Verified Citizen
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Personal Demographic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" {...register('fullName')} />
              <Input label="Contact Number" {...register('contactNumber')} />
              <Select label="Gender" options={['Male', 'Female', 'Other']} {...register('gender')} />
              <Select label="Blood Group" options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} {...register('bloodGroup')} />
            </div>
          </Card>

          <Card title="Emergency Contact & Next of Kin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Contact Name" {...register('emergencyName')} />
              <Input label="Relationship" {...register('emergencyRelation')} />
              <Input label="Phone Number" {...register('emergencyPhone')} />
            </div>
          </Card>

          <Card title="Clinical Profile & Pre-existing Conditions">
            <div className="space-y-4">
              <Input
                label="Known Allergies (Comma Separated)"
                placeholder="e.g. Penicillin, Peanuts, Latex"
                {...register('allergies')}
              />
              <Input
                label="Past Medical History & Surgeries"
                placeholder="e.g. Hypertension, Appendectomy (2021)"
                {...register('medicalHistory')}
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Profile Changes
            </Button>
          </div>
        </div>

        {/* Right Info Box (1 Col) */}
        <div className="space-y-6">
          <Card title="Health ID Verification">
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Unique Health ID:</span>
                <span className="font-mono font-bold text-slate-900">{profile?.healthId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-900">{formatDate(profile?.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-500">Registered On:</span>
                <span className="font-semibold text-slate-900">{formatDate(profile?.createdAt)}</span>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;
