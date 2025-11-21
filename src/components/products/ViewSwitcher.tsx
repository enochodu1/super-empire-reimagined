import { LayoutGrid, List, Table, Rows3 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export type ViewMode = 'grid' | 'list' | 'table' | 'compact';

interface ViewSwitcherProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewSwitcher = ({ view, onViewChange }: ViewSwitcherProps) => {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(value) => {
        if (value) onViewChange(value as ViewMode);
      }}
      className="border rounded-lg p-1"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view" className="gap-2">
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view" className="gap-2">
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table view" className="gap-2">
        <Table className="h-4 w-4" />
        <span className="hidden sm:inline">Table</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="compact" aria-label="Compact view" className="gap-2">
        <Rows3 className="h-4 w-4" />
        <span className="hidden sm:inline">Compact</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
