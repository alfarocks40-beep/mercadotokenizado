import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Asset {
  id: string;
  name: string;
  category: string;
  platform: string;
  ticket: number;
  yield: string;
  term: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .order('name');

        if (error) throw error;

        setAssets(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching assets');
        console.error('Error fetching assets:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, []);

  return { assets, loading, error };
}

// Derived data helpers
export function useAssetCategories(assets: Asset[]) {
  return [...new Set(assets.map(asset => asset.category))].sort();
}

export function useAssetPlatforms(assets: Asset[]) {
  return [...new Set(assets.map(asset => asset.platform))].sort();
}