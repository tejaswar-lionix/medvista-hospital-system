'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'patient' | 'system' | 'message' | 'lab-result';
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Upcoming Appointment',
    message: 'You have an appointment with patient John Smith in 30 minutes.',
    type: 'appointment',
    timestamp: '2024-01-15T10:30:00',
    read: false,
  },
  {
    id: '2',
    title: 'Lab Results Ready',
    message: 'Lab results for patient Jane Doe are now available for review.',
    type: 'lab-result',
    timestamp: '2024-01-15T09:15:00',
    read: false,
  },
  {
    id: '3',
    title: 'New Patient Assignment',
    message: 'Patient Michael Brown has been assigned to your care.',
    type: 'patient',
    timestamp: '2024-01-14T16:45:00',
    read: true,
  },
  {
    id: '4',
    title: 'System Update',
    message: 'EHR system will undergo maintenance tonight from 11 PM to 1 AM.',
    type: 'system',
    timestamp: '2024-01-14T14:20:00',
    read: true,
  },
  {
    id: '5',
    title: 'Message from Nursing Staff',
    message: 'Urgent: Patient in Room 204 requires immediate attention.',
    type: 'message',
    timestamp: '2024-01-14T11:30:00',
    read: false,
  },
];

export default function DoctorNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleRead = (id: string) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'patient':
        return '👤';
      case 'system':
        return '⚙️';
      case 'message':
        return '✉️';
      case 'lab-result':
        return '🔬';
      default:
        return '📋';
    }
  };

  const getTypeBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-800';
      case 'patient':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      case 'message':
        return 'bg-purple-100 text-purple-800';
      case 'lab-result':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'unread', 'appointment', 'patient', 'lab-result', 'message', 'system'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow p-4 border-l-4 transition cursor-pointer ${
              notification.read
                ? 'border-gray-300 opacity-75'
                : 'border-blue-500'
            }`}
            onClick={() => toggleRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getTypeIcon(notification.type)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notification.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeColor(notification.type)}`}>
                    {notification.type.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{notification.message}</p>
                <p className="text-gray-400 text-xs mt-2">{formatTimestamp(notification.timestamp)}</p>
              </div>
              {!notification.read && (
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              )}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <span className="text-4xl">🔔</span>
            <p className="text-gray-500 mt-4">No notifications to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
