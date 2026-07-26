import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNotifications from '../../hooks/useNotifications';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: 'PATIENT', gender: 'Male', bloodGroup: 'B+' }
  });
  const { register: registerUser } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : ''
      };

      if (payload.role === 'ADMIN') {
        payload.phoneNumber = data.phoneNumber;
        payload.employeeId = data.employeeId;
      }

      const result = await registerUser(payload);
      showSuccess(`Digital Health ID Registered Successfully!`);
      if (result.user.role === 'PATIENT') navigate('/patient/dashboard');
      else if (result.user.role === 'DOCTOR') navigate('/doctor/dashboard');
      else navigate('/');
    } catch (err) {
      showError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Register Digital Account</h2>
        <p className="text-xs text-slate-500 mt-1">Enroll in the Centralized Digital Health Platform</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Account Role"
          options={[
            { value: 'PATIENT', label: 'Citizen / Patient' },
            { value: 'DOCTOR', label: 'Healthcare Provider / Doctor' },
            { value: 'ADMIN', label: 'Administrator' }
          ]}
          {...register('role')}
        />

        <Input
          label="Full Legal Name"
          placeholder="e.g. Rohan Gupta"
          {...register('fullName', { required: 'Full name is required' })}
          error={errors.fullName?.message}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          {...register('email', { required: 'Email address is required' })}
          error={errors.email?.message}
        />

        <Input
          label="Account Password"
          type="password"
          placeholder="Min 6 characters"
          {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })}
          error={errors.password?.message}
        />

        {selectedRole === 'ADMIN' ? (
          <>
            <Input
              label="Phone Number"
              placeholder="9876543210"
              {...register('phoneNumber', { required: 'Phone number required' })}
              error={errors.phoneNumber?.message}
            />
            <Input
              label="Employee ID"
              placeholder="e.g. EMP-1001"
              {...register('employeeId', { required: 'Employee ID required' })}
              error={errors.employeeId?.message}
            />
          </>
        ) : selectedRole === 'PATIENT' ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Date of Birth"
                type="date"
                {...register('dateOfBirth', { required: 'DOB required' })}
                error={errors.dateOfBirth?.message}
              />
              <Select
                label="Gender"
                options={['Male', 'Female', 'Other']}
                {...register('gender')}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Blood Group"
                options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                {...register('bloodGroup')}
              />
              <Input
                label="Phone Number"
                placeholder="9876543210"
                {...register('contactNumber', { required: 'Contact number required' })}
                error={errors.contactNumber?.message}
              />
            </div>
          </>
        ) : (
          <>
            <Input
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth', { required: 'DOB required' })}
              error={errors.dateOfBirth?.message}
            />
            <Input
              label="Medical License Number"
              placeholder="e.g. MCI-REG-84920"
              {...register('licenseNumber', { required: 'License number required' })}
              error={errors.licenseNumber?.message}
            />
            <Input
              label="Specialization"
              placeholder="e.g. Cardiology"
              {...register('specialization', { required: 'Specialization required' })}
              error={errors.specialization?.message}
            />
          </>
        )}

        <Button type="submit" variant="primary" className="w-full" isLoading={loading} icon={UserPlus}>
          Generate Digital Health Profile
        </Button>
      </form>

      <div className="text-center text-xs text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-bold text-primary-600 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
