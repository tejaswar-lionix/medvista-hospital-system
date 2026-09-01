'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'system' | 'billing' | 'alert' | 'message';
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Appointment Booked',
    message: 'Patient John Smith has booked an appointment with Dr. Johnson for tomorrow at 10:00 AM.',
    type: 'appointment',
    timestamp: '2024-01-15T10:30:00',
    read: false,
  },
  {
    id: '2',
    title: 'System Maintenance Scheduled',
    message: 'System maintenance is scheduled for January 20th from 2:00 AM to 4:00 AM.',
    type: 'system',
    timestamp: '2024-01-15T09:15:00',
    read: false,
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $250.00 received from patient Jane Doe for bill #INV-2024-001.',
    type: 'billing',
    timestamp: '2024-01-14T16:45:00',
    read: true,
  },
  {
    id: '4',
    title: 'Low Inventory Alert',
    message: 'Medical supplies running low in Pharmacy. Current stock below minimum threshold.',
    type: 'alert',
    timestamp: '2024-01-14T14:20:00',
    read: true,
  },
  {
    id: '5',
    title: 'New Message from Dr. Williams',
    message: 'You have a new message regarding patient referral for the cardiology department.',
    type: 'message',
    timestamp: '2024-01-14T11:30:00',
    read: false,
  },
  {
    id: '6',
    title: 'Appointment Cancelled',
    message: 'Patient Michael Brown has cancelled appointment #APT-5678 scheduled for January 18th.',
    type: 'appointment',
    timestamp: '2024-01-13T09:00:00',
    read: true,
  },
];

export default function AdminNotificationsPage() {
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

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'system':
        return '⚙️';
      case 'billing':
        return '💰';
      case 'alert':
        return '⚠️';
      case 'message':
        return '✉️';
      default:
        return '📋';
    }
  };

  const getTypeBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      case 'billing':
        return 'bg-green-100 text-green-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'message':
        return 'bg-purple-100 text-purple-800';
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
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
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
          {['all', 'unread', 'appointment', 'system', 'billing', 'alert', 'message'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
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
            className={`bg-white rounded-lg shadow p-4 border-l-4 transition ${
              notification.read
                ? 'border-gray-300 opacity-75'
                : 'border-blue-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-2">{formatTimestamp(notification.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRead(notification.id)}
                  className="text-gray-500 hover:text-blue-600 transition p-1"
                  title={notification.read ? 'Mark as unread' : 'Mark as read'}
                >
                  {notification.read ? '📩' : '📭'}
                </button>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-gray-500 hover:text-red-600 transition p-1"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
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
