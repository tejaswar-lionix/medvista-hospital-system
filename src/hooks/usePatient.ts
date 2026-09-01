'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/constants';
import { PatientFilterInput } from '@/lib/validations/patient';

interface Patient {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  dateOfBirth: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  bloodGroup: string | null;
  emergencyContact: string | null;
  emergencyContactName: string | null;
  insuranceProvider: string | null;
  insurancePolicyNumber: string | null;
  medicalHistory: string | null;
  _count?: {
    appointments: number;
    medicalRecords: number;
    bills: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface UsePatientsReturn {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refetch: () => void;
  filters: PatientFilterInput;
  setFilters: (filters: Partial<PatientFilterInput>) => void;
  clearFilters: () => void;
}

const defaultFilters: PatientFilterInput = {
  page: 1,
  limit: 10,
};

export function usePatients(initialFilters?: Partial<PatientFilterInput>): UsePatientsReturn {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [filters, setFiltersState] = useState<PatientFilterInput>({
    ...defaultFilters,
    ...initialFilters,
  });

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });

      const response = await fetch(`${API_ENDPOINTS.PATIENTS}?${searchParams.toString()}`);

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch patients');
      }

      const data = await response.json();
      setPatients(data.patients);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters, router]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const setPage = useCallback((page: number) => {
    setFiltersState((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setFiltersState((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setFilters = useCallback((newFilters: Partial<PatientFilterInput>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const refetch = useCallback(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
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

export function usePatient(id: string | null) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_ENDPOINTS.PATIENTS}/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch patient');
      }

      const data = await response.json();
      setPatient(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return {
    patient,
    isLoading,
    error,
    refetch: fetchPatient,
  };
}
