import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { AlertCircle, UploadCloud } from 'lucide-react';
import { reportService } from '../../services/reportService';
import useNotifications from '../../hooks/useNotifications';

const UploadReportForm = ({ patientId, onSuccess, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const { showSuccess, showError } = useNotifications();

  const onSubmit = async (data) => {
    if (!selectedFile) {
      const errorMessage = 'Please select a PDF report document or image file';
      setUploadError(errorMessage);
      showError(errorMessage);
      return;
    }

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type) && !['.pdf', '.png', '.jpg', '.jpeg'].includes(selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase())) {
      const errorMessage = 'Unsupported file type. Please upload a PDF, PNG, JPG, or JPEG.';
      setUploadError(errorMessage);
      showError(errorMessage);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      const errorMessage = 'File is too large. Maximum upload size is 10MB.';
      setUploadError(errorMessage);
      showError(errorMessage);
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('reportDocument', selectedFile);
      formData.append('title', data.title);
      formData.append('category', data.category);
      if (patientId) formData.append('patientId', patientId);

      await reportService.uploadReport(formData, (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      setUploadProgress(100);
      showSuccess('Medical report uploaded successfully!');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      const errorMessage = err.message || 'Failed to upload medical report';
      setUploadError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Report Document Title"
        placeholder="e.g. Chest X-Ray Radiology Scan"
        {...register('title', { required: 'Report title required' })}
        error={errors.title?.message}
      />

      <Select
        label="Report Category"
        options={['Blood Test', 'Radiology', 'Pathology', 'Scan', 'Other']}
        {...register('category', { required: 'Select a category' })}
        error={errors.category?.message}
      />

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
          Attach File (PDF, PNG, JPG - Max 10MB)
        </label>
        <div className="border-2 border-dashed border-slate-300 rounded-card p-6 text-center hover:bg-slate-50 transition-colors">
          <UploadCloud className="w-10 h-10 mx-auto text-slate-400 mb-2" />
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
            id="report-file-input"
          />
          <label htmlFor="report-file-input" className="cursor-pointer text-sm font-semibold text-primary-600 hover:text-primary-700">
            {selectedFile ? selectedFile.name : 'Click to select file from device'}
          </label>
          {selectedFile && (
            <p className="text-xs text-slate-500 mt-1">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          )}
        </div>
      </div>

      {loading && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-center justify-between text-sm text-blue-700">
            <span>Uploading report...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {uploadError && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={loading}>
          Upload Report
        </Button>
      </div>
    </form>
  );
};

export default UploadReportForm;
