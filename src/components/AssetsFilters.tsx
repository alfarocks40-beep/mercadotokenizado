import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface FiltersState {
  search: string;
  category: string;
  platform: string;
  maxTicket: string;
}

interface AssetsFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  resultsCount: number;
  onReceiveOffers: () => void;
  categories: string[];
  platforms: string[];
}

export const AssetsFilters = ({
  filters,
  onFiltersChange,
  resultsCount,
  onReceiveOffers,
  categories,
  platforms,
}: AssetsFiltersProps) => {
  const { t } = useLanguage();

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: '',
      platform: '',
      maxTicket: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Category */}
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.category} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.category}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Platform */}
        <Select
          value={filters.platform}
          onValueChange={(value) => onFiltersChange({ ...filters, platform: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.platform} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t.platform}</SelectItem>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Max Ticket */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Input
          type="number"
          placeholder={t.maxTicket}
          value={filters.maxTicket}
          onChange={(e) => onFiltersChange({ ...filters, maxTicket: e.target.value })}
          min="0"
        />
        
        {/* Results and Actions */}
        <div className="flex items-center gap-4 md:col-span-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {resultsCount} {t.resultsCount}
          </span>
          
          <div className="flex gap-2 flex-1 justify-end">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2">
                <X className="w-4 h-4" />
                {t.clearFilters}
              </Button>
            )}
            <Button onClick={onReceiveOffers} className="gap-2 bg-gradient-primary hover:opacity-90 transition-fast">
              📧 {t.receiveOffers}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};