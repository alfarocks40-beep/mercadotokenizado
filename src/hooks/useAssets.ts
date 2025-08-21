import { useQuery } from '@tanstack/react-query';
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

async function fetchAssets(): Promise<Asset[]> {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export function useAssets() {
  const { data: assets = [], isLoading: loading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
  });

  return { 
    assets, 
    loading, 
    error: error?.message || null 
  };
}

// Derived data helpers
export function useAssetCategories(assets: Asset[]) {
  return [...new Set(assets.map(asset => asset.category))].sort();
}

export function useAssetPlatforms(assets: Asset[]) {
  return [...new Set(assets.map(asset => asset.platform))].sort();
}