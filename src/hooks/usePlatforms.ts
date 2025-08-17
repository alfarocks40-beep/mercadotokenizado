import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Platform {
  id: string;
  name: string;
  about: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('platforms')
          .select('*')
          .order('name');

        if (error) throw error;

        setPlatforms(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching platforms');
        console.error('Error fetching platforms:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlatforms();
  }, []);

  return { platforms, loading, error };
}