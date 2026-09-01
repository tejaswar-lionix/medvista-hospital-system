import { User, Phone, Mail, Calendar, Droplet, FileText, ExternalLink } from "lucide-react";

interface PatientInfoCardProps {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  dob: string;
  bloodGroup?: string;
  patientId: string;
  onViewRecords?: () => void;
}

export default function PatientInfoCard({
  name,
  age,
  gender,
  phone,
  email,
  dob,
  bloodGroup,
  patientId,
  onViewRecords,
}: PatientInfoCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-rose-100">ID: {patientId}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-6 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <InfoRow icon={<Calendar className="w-4 h-4" />} label="Age" value={`${age} years`} />
          <InfoRow icon={<User className="w-4 h-4" />} label="Gender" value={gender} />
          <InfoRow icon={<Calendar className="w-4 h-4" />} label="DOB" value={dob} />
          {bloodGroup && (
            <InfoRow icon={<Droplet className="w-4 h-4" />} label="Blood Group" value={bloodGroup} />
          )}
          <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={phone} />
          <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={email} />
        </div>
      </div>

      {/* Action */}
      {onViewRecords && (
        <div className="px-6 py-3 border-t border-gray-100">
          <button
            onClick={onViewRecords}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <FileText className="w-4 h-4" />
            View Medical Records
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
