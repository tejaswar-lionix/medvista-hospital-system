import { ApiError } from '@/types/api';

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw await handleApiError(res);
  }

  return res.json();
}

export async function fetchWithAuth<T>(
  url: string,
  token: string,
  options?: RequestInit
): Promise<T> {
  return fetchApi<T>(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
}

export async function handleApiError(res: Response): Promise<ApiError> {
  try {
    const body = await res.json();
    return {
      message: body.message || 'An error occurred',
      code: res.status,
      details: body.details,
    };
  } catch {
    return {
      message: `HTTP Error ${res.status}: ${res.statusText}`,
      code: res.status,
    };
  }
}

export function formatApiError(error: ApiError): string {
  if (error.details) {
    if (Array.isArray(error.details)) {
      return error.details.map((d: { message: string }) => d.message).join('; ');
    }
    return String(error.details);
  }
  return error.message;
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  }
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}
