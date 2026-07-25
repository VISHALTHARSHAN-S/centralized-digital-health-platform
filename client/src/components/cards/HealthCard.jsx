import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Download, Printer, Activity } from 'lucide-react';
import { formatDate, calculateAge } from '../../utils/formatters';
import { downloadElementAsPDF } from '../../utils/pdfGenerator';
import Button from '../ui/Button';

const HealthCard = ({ patient }) => {
  if (!patient) return null;

  const handleDownloadPDF = () => {
    downloadElementAsPDF('printable-health-card', `Digital_Health_Card_${patient.healthId}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const qrPayload = JSON.stringify({
    healthId: patient.healthId,
    fullName: patient.fullName,
    bloodGroup: patient.bloodGroup,
    emergencyContact: patient.emergencyContact?.phone || patient.contactNumber
  });

  return (
    <div className="space-y-4">
      {/* Printable Digital Card Container */}
      <div
        id="printable-health-card"
        className="relative w-full max-w-lg mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white rounded-2xl p-6 shadow-2xl border border-blue-400/30 overflow-hidden"
      >
        {/* Background Emblem watermark pattern */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-white" />
        </div>

        {/* Header Header */}
        <div className="flex items-center justify-between border-b border-blue-400/20 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 backdrop-blur-md flex items-center justify-center border border-blue-300/30">
              <Activity className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300">National Health Authority</p>
              <h2 className="text-base font-extrabold tracking-wide text-white">DIGITAL HEALTH CARD</h2>
            </div>
          </div>
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Main Info */}
          <div className="col-span-2 space-y-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-200/80">Unique Health ID (HID)</p>
              <p className="text-lg font-mono font-bold tracking-wider text-amber-300">{patient.healthId}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-200/80">Citizen Name</p>
              <p className="text-base font-bold text-white">{patient.fullName}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-blue-200/70">DOB / Age</p>
                <p className="font-semibold text-slate-100">{formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} yrs)</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-blue-200/70">Gender</p>
                <p className="font-semibold text-slate-100">{patient.gender}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-blue-200/70">Blood Group</p>
                <p className="font-bold text-rose-300 text-sm">{patient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-blue-200/70">Emergency Phone</p>
                <p className="font-semibold text-slate-100">{patient.emergencyContact?.phone || patient.contactNumber}</p>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="col-span-1 flex flex-col items-center justify-center p-3 bg-white/95 rounded-xl shadow-inner border border-white">
            <QRCodeSVG value={qrPayload} size={96} level="M" />
            <p className="text-[9px] font-bold text-slate-700 mt-2 text-center">SCAN FOR RECORDS</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-blue-400/20 flex justify-between items-center text-[9px] text-blue-200/70">
          <span>Centralized Health Management System</span>
          <span>Government of Digital Health Portal</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-3 pt-2">
        <Button variant="primary" icon={Download} onClick={handleDownloadPDF}>
          Download Health Card PDF
        </Button>
        <Button variant="secondary" icon={Printer} onClick={handlePrint}>
          Print Card
        </Button>
      </div>
    </div>
  );
};

export default HealthCard;
