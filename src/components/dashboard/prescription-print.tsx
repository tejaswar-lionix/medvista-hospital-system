import { useRef } from 'react';

interface PrescriptionData {
  prescriptionId: string;
  date: string;
  hospital: {
    name: string;
    address: string;
    phone: string;
    logo?: string;
  };
  doctor: {
    name: string;
    qualification: string;
    specialization: string;
    licenseNumber: string;
  };
  patient: {
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
    patientId: string;
    address: string;
    phone: string;
  };
  medicines: {
    name: string;
    genericName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    quantity: number;
  }[];
  diagnosis: string;
  notes: string;
  followUpDate: string;
}

interface PrescriptionPrintProps {
  prescription: PrescriptionData;
}

export function PrescriptionPrint({ prescription }: PrescriptionPrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${prescription.prescriptionId}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; color: #000; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
            .hospital-name { font-size: 24px; font-weight: bold; }
            .hospital-info { font-size: 12px; color: #555; margin-top: 5px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; font-size: 14px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 13px; }
            .info-item span:first-child { color: #555; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f5f5f5; font-weight: bold; }
            .signature { margin-top: 40px; display: flex; justify-content: flex-end; }
            .signature-line { text-align: center; border-top: 1px solid #000; width: 200px; padding-top: 5px; font-size: 12px; }
            .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="hospital-name">${prescription.hospital.name}</div>
            <div class="hospital-info">${prescription.hospital.address}</div>
            <div class="hospital-info">Phone: ${prescription.hospital.phone}</div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 13px;">
            <div><strong>Prescription #:</strong> ${prescription.prescriptionId}</div>
            <div><strong>Date:</strong> ${new Date(prescription.date).toLocaleDateString()}</div>
          </div>
          <div class="section">
            <div class="section-title">Doctor Information</div>
            <div class="info-grid">
              <div><span>Name: </span><strong>Dr. ${prescription.doctor.name}</strong></div>
              <div><span>Qualification: </span>${prescription.doctor.qualification}</div>
              <div><span>Specialization: </span>${prescription.doctor.specialization}</div>
              <div><span>License #: </span>${prescription.doctor.licenseNumber}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">Patient Information</div>
            <div class="info-grid">
              <div><span>Name: </span><strong>${prescription.patient.name}</strong></div>
              <div><span>Patient ID: </span>${prescription.patient.patientId}</div>
              <div><span>Age/Gender: </span>${prescription.patient.age} / ${prescription.patient.gender}</div>
              <div><span>Blood Group: </span>${prescription.patient.bloodGroup}</div>
              <div><span>Address: </span>${prescription.patient.address}</div>
              <div><span>Phone: </span>${prescription.patient.phone}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">Diagnosis</div>
            <p style="font-size: 13px;">${prescription.diagnosis}</p>
          </div>
          <div class="section">
            <div class="section-title">Prescribed Medicines</div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Qty</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                ${prescription.medicines.map((med, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${med.name}</strong><br><small>${med.genericName}</small></td>
                    <td>${med.dosage}</td>
                    <td>${med.frequency}</td>
                    <td>${med.duration}</td>
                    <td>${med.quantity}</td>
                    <td>${med.instructions}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${prescription.notes ? `
          <div class="section">
            <div class="section-title">Additional Notes</div>
            <p style="font-size: 13px;">${prescription.notes}</p>
          </div>
          ` : ''}
          ${prescription.followUpDate ? `
          <div class="section">
            <div class="section-title">Follow-up</div>
            <p style="font-size: 13px;">Next appointment: ${new Date(prescription.followUpDate).toLocaleDateString()}</p>
          </div>
          ` : ''}
          <div class="signature">
            <div class="signature-line">
              Dr. ${prescription.doctor.name}<br>
              <small>${prescription.doctor.qualification}</small>
            </div>
          </div>
          <div class="footer">
            <p>This is a computer-generated prescription. Valid without signature.</p>
            <p>${prescription.hospital.name} | ${prescription.hospital.phone}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Prescription Preview</h3>
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print Prescription
        </button>
      </div>

      <div ref={printRef} className="p-8 max-w-4xl mx-auto">
        <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{prescription.hospital.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{prescription.hospital.address}</p>
          <p className="text-sm text-gray-600">Phone: {prescription.hospital.phone}</p>
        </div>

        <div className="flex justify-between mb-6 text-sm">
          <div><span className="font-semibold">Prescription #:</span> {prescription.prescriptionId}</div>
          <div><span className="font-semibold">Date:</span> {new Date(prescription.date).toLocaleDateString()}</div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-300">Doctor</h4>
            <p className="text-sm">Dr. {prescription.doctor.name}</p>
            <p className="text-sm text-gray-600">{prescription.doctor.qualification}</p>
            <p className="text-sm text-gray-600">{prescription.doctor.specialization}</p>
            <p className="text-xs text-gray-500 mt-1">License: {prescription.doctor.licenseNumber}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-300">Patient</h4>
            <p className="text-sm font-medium">{prescription.patient.name}</p>
            <p className="text-sm text-gray-600">ID: {prescription.patient.patientId}</p>
            <p className="text-sm text-gray-600">{prescription.patient.age} yrs / {prescription.patient.gender} / {prescription.patient.bloodGroup}</p>
            <p className="text-sm text-gray-600">{prescription.patient.address}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Diagnosis</h4>
          <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">{prescription.diagnosis}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Medicines</h4>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Medicine</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Dosage</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Frequency</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Duration</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Qty</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((med, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-3 py-2">{i + 1}</td>
                  <td className="border border-gray-300 px-3 py-2"><strong>{med.name}</strong><br /><span className="text-xs text-gray-500">{med.genericName}</span></td>
                  <td className="border border-gray-300 px-3 py-2">{med.dosage}</td>
                  <td className="border border-gray-300 px-3 py-2">{med.frequency}</td>
                  <td className="border border-gray-300 px-3 py-2">{med.duration}</td>
                  <td className="border border-gray-300 px-3 py-2">{med.quantity}</td>
                  <td className="border border-gray-300 px-3 py-2">{med.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {prescription.notes && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
            <p className="text-sm text-gray-700">{prescription.notes}</p>
          </div>
        )}

        {prescription.followUpDate && (
          <div className="mb-6 p-3 bg-blue-50 rounded border border-blue-200">
            <span className="font-semibold text-blue-900">Follow-up: </span>
            <span className="text-blue-800">{new Date(prescription.followUpDate).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex justify-end mt-12">
          <div className="text-center w-48">
            <div className="border-t border-gray-900 pt-2">
              <p className="font-semibold text-sm">Dr. {prescription.doctor.name}</p>
              <p className="text-xs text-gray-600">{prescription.doctor.qualification}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
