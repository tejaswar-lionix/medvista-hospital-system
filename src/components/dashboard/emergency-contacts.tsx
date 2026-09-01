import { useState } from 'react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  isPrimary: boolean;
}

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onAdd?: (contact: Omit<EmergencyContact, 'id'>) => void;
  onEdit?: (id: string, contact: Partial<EmergencyContact>) => void;
  onDelete?: (id: string) => void;
}

export function EmergencyContacts({ contacts, onAdd, onEdit, onDelete }: EmergencyContactsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', relationship: '', phone: '', email: '', address: '', isPrimary: false });

  const handleSubmit = () => {
    if (editingId) {
      onEdit?.(editingId, formData);
    } else {
      onAdd?.(formData);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', relationship: '', phone: '', email: '', address: '', isPrimary: false });
  };

  const startEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setFormData({ name: contact.name, relationship: contact.relationship, phone: contact.phone, email: contact.email, address: contact.address, isPrimary: contact.isPrimary });
    setShowForm(true);
  };

  const getRelationshipColor = (relationship: string) => {
    const colors: Record<string, string> = {
      'Spouse': 'bg-pink-100 text-pink-800',
      'Parent': 'bg-blue-100 text-blue-800',
      'Sibling': 'bg-green-100 text-green-800',
      'Child': 'bg-purple-100 text-purple-800',
      'Friend': 'bg-yellow-100 text-yellow-800',
    };
    return colors[relationship] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', relationship: '', phone: '', email: '', address: '', isPrimary: false }); }} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add
        </button>
      </div>

      {showForm && (
        <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">{editingId ? 'Edit Contact' : 'New Contact'}</h4>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" placeholder="Relationship" value={formData.relationship} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={formData.isPrimary} onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Primary Contact
            </label>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className={`p-4 rounded-lg border-2 transition-all ${contact.isPrimary ? 'border-blue-200 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{contact.name}</h4>
                  {contact.isPrimary && <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-medium">Primary</span>}
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRelationshipColor(contact.relationship)}`}>{contact.relationship}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {contact.phone}
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {contact.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => startEdit(contact)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => onDelete?.(contact.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p>No emergency contacts added yet</p>
        </div>
      )}
    </div>
  );
}
