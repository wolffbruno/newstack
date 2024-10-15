"use client";

import useSWR from 'swr';

// Define the base URL for your OpenStack API
const BASE_URL = 'http://192.168.56.101';

// Authentication function
const authenticate = async (username: string, password: string, projectId: string) => {
  const response = await fetch(`${BASE_URL}:5000/v3/auth/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth: {
        identity: {
          methods: ['password'],
          password: {
            user: {
              name: username,
              domain: { id: 'default' },
              password: password,
            },
          },
        },
        scope: {
          project: {
            id: projectId,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const token = response.headers.get('X-Subject-Token');
  return token;
};

// Hook for authentication
export function useAuthenticate() {
  const { data: token, error, mutate } = useSWR('auth-token', null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const login = async (username: string, password: string, projectId: string) => {
    try {
      const newToken = await authenticate(username, password, projectId);
      mutate(newToken, false);
      return newToken;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    mutate(null, false);
  };

  return { token, error, login, logout };
}

// Fetch function to be used with SWR
const fetcher = async (url: string) => {
  const { token } = useAuthenticate();
  if (!token) {
    throw new Error('No authentication token available');
  }

  const response = await fetch(url, {
    headers: {
      'X-Auth-Token': token,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

// Hook to get list of servers (instances)
export function useServers() {
  return useSWR(`${BASE_URL}/compute/v2.1/servers`, fetcher);
}

// Hook to get details of a specific server
export function useServerDetails(serverId: string) {
  return useSWR(serverId ? `${BASE_URL}/compute/v2.1/servers/${serverId}` : null, fetcher);
}

// Hook to get list of flavors
export function useFlavors() {
  return useSWR(`${BASE_URL}/compute/v2.1/flavors`, fetcher);
}

// Hook to get list of images
export function useImages() {
  return useSWR(`${BASE_URL}/image/v2/images`, fetcher);
}

// Hook to get list of networks
export function useNetworks() {
  return useSWR(`${BASE_URL}/network/v2.0/networks`, fetcher);
}

// Hook to get list of security groups
export function useSecurityGroups() {
  return useSWR(`${BASE_URL}/network/v2.0/security-groups`, fetcher);
}
