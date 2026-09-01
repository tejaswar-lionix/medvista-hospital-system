'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/constants';
import { AppointmentFilterInput } from '@/lib/validations/appointment';

interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  type: string;
  reason: string | null;
  notes: string | null;
  patient: {
    id: string;
    user: {
      name: string;
      email: string;
    };
  };
  doctor: {
    id: string;
    user: {
      name: string;
      email: string;
    };
    specialization: string;
  };
  department: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UseAppointmentsReturn {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refetch: () => void;
  filters: AppointmentFilterInput;
  setFilters: (filters: Partial<AppointmentFilterInput>) => void;
  clearFilters: () => void;
}

const defaultFilters: AppointmentFilterInput = {
  page: 1,
  limit: 10,
};

export function useAppointments(initialFilters?: Partial<AppointmentFilterInput>): UseAppointmentsReturn {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [filters, setFiltersState] = useState<AppointmentFilterInput>({
    ...defaultFilters,
    ...initialFilters,
  });

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });

      const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS}?${searchParams.toString()}`);

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data.appointments);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters, router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const setPage = useCallback((page: number) => {
    setFiltersState((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setFiltersState((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setFilters = useCallback((newFilters: Partial<AppointmentFilterInput>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const refetch = useCallback(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    total,
    page: filters.page || 1,
    limit: filters.limit || 10,
    setPage,
    setLimit,
    refetch,
    filters,
    setFilters,
    clearFilters,
  };
}

export function useAppointment(id: string | null) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointment = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_ENDPOINTS.APPOINTMENTS}/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch appointment');
      }

      const data = await response.json();
      setAppointment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  return {
    appointment,
    isLoading,
    error,
    refetch: fetchAppointment,
  };
}
