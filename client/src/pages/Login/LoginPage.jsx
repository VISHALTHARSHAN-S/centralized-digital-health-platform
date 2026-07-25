import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useNotifications from '../../hooks/useNotifications';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, LogIn, UserCheck, Stethoscope, ShieldAlert } from 'lucide-react';

const LoginPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { login } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data);
      showSuccess(`Welcome back, ${result.user.email}!`);
      
      if (result.user.role === 'PATIENT') navigate('/patient/dashboard');
      else if (result.user.role === 'DOCTOR') navigate('/doctor/dashboard');
      else if (result.user.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
      showError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (email, password) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Sign In to CHMS</h2>
        <p className="text-xs text-slate-500 mt-1">Access your centralized healthcare workspace</p>
      </div>

      {/* Demo Credentials Quick Buttons */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-card space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Quick Fill Demo Accounts</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => fillDemo('patient@chms.gov.in', 'password123')}
            className="px-2 py-1.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center"
          >
            <UserCheck className="w-3.5 h-3.5 mr-1" /> Patient
          </button>
          <button
            type="button"
            onClick={() => fillDemo('doctor.sharma@chms.gov.in', 'password123')}
            className="px-2 py-1.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold flex items-center justify-center"
          >
            <Stethoscope className="w-3.5 h-3.5 mr-1" /> Doctor
          </button>
          <button
            type="button"
            onClick={() => fillDemo('admin@chms.gov.in', 'password123')}
            className="px-2 py-1.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-semibold flex items-center justify-center"
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Admin
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="name@example.gov.in"
          {...register('email', { required: 'Email address is required' })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />

        <Button type="submit" variant="primary" className="w-full" isLoading={loading} icon={LogIn}>
          Authenticate & Sign In
        </Button>
      </form>

      <div className="text-center text-xs text-slate-600">
        Don't have a Digital Health ID?{' '}
        <Link to="/register" className="font-bold text-primary-600 hover:underline">
          Register New Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
