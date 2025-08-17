import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { Asset } from '@/data/assets';
import { useLanguage } from '@/hooks/useLanguage';
import { formatCurrency } from '@/lib/i18n';

type SortField = 'name' | 'category' | 'platform' | 'ticket' | 'yield' | 'term';
type SortDirection = 'asc' | 'desc';

interface AssetsTableProps {
  assets: Asset[];
}

export const AssetsTable = ({ assets }: AssetsTableProps) => {
  const { t, language } = useLanguage();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const extractYieldNumber = (yieldStr: string): number => {
    const match = yieldStr.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const extractTermMonths = (termStr: string): number => {
    if (termStr === 'indef.' || termStr === 'indefinido' || termStr === 'indefinite') {
      return Infinity;
    }
    const match = termStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Special sorting logic for different fields
    switch (sortField) {
      case 'yield':
        aValue = extractYieldNumber(a.yield);
        bValue = extractYieldNumber(b.yield);
        break;
      case 'term':
        aValue = extractTermMonths(a.term);
        bValue = extractTermMonths(b.term);
        break;
      case 'ticket':
        aValue = a.ticket;
        bValue = b.ticket;
        break;
      default:
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:text-primary transition-fast select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="w-4 h-4 opacity-50" />
      </div>
    </TableHead>
  );

  const handleInvest = (url: string, assetName: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      <div className="overflow-x-auto custom-scrollbar">
        <Table className="table-hover">
          <TableHeader>
            <TableRow>
              <SortableHeader field="name">{t.asset}</SortableHeader>
              <SortableHeader field="category">{t.category}</SortableHeader>
              <SortableHeader field="platform">{t.platform}</SortableHeader>
              <SortableHeader field="ticket">{t.minTicket}</SortableHeader>
              <SortableHeader field="yield">{t.yield}</SortableHeader>
              <SortableHeader field="term">{t.term}</SortableHeader>
              <TableHead className="text-center">{t.action}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAssets.map((asset) => (
              <TableRow key={asset.id} className="transition-fast">
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-secondary rounded-md text-xs font-medium">
                    {asset.category}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{asset.platform}</TableCell>
                <TableCell className="font-mono">
                  {formatCurrency(asset.ticket, language)}
                </TableCell>
                <TableCell className="font-medium text-success">{asset.yield}</TableCell>
                <TableCell className="text-muted-foreground">{asset.term}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleInvest(asset.url, asset.name)}
                    className="gap-2 bg-gradient-primary hover:opacity-90 transition-fast"
                    aria-label={`${t.invest} ${asset.name}`}
                  >
                    {t.invest}
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {assets.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Nenhum ativo encontrado com os filtros aplicados.</p>
          <p className="text-sm mt-2">Tente ajustar os filtros para ver mais resultados.</p>
        </div>
      )}
    </div>
  );
};