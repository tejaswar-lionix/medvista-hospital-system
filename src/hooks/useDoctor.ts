'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/constants';
import { DoctorFilterInput } from '@/lib/validations/doctor';

interface Doctor {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  availableDays: string;
  availableTimeStart: string;
  availableTimeEnd: string;
  phone: string | null;
  bio: string | null;
  department: {
    id: string;
    name: string;
  };
  _count?: {
    appointments: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface UseDoctorsReturn {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refetch: () => void;
  filters: DoctorFilterInput;
  setFilters: (filters: Partial<DoctorFilterInput>) => void;
  clearFilters: () => void;
}

const defaultFilters: DoctorFilterInput = {
  page: 1,
  limit: 10,
};

export function useDoctors(initialFilters?: Partial<DoctorFilterInput>): UseDoctorsReturn {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [filters, setFiltersState] = useState<DoctorFilterInput>({
    ...defaultFilters,
    ...initialFilters,
  });

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });

      const response = await fetch(`${API_ENDPOINTS.DOCTORS}?${searchParams.toString()}`);

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      setDoctors(data.doctors);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters, router]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const setPage = useCallback((page: number) => {
    setFiltersState((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setFiltersState((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setFilters = useCallback((newFilters: Partial<DoctorFilterInput>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const refetch = useCallback(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
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

export function useDoctor(id: string | null) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctor = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_ENDPOINTS.DOCTORS}/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch doctor');
      }

      const data = await response.json();
      setDoctor(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDoctor();
  }, [fetchDoctor]);

  return {
    doctor,
    isLoading,
    error,
    refetch: fetchDoctor,
  };
}
