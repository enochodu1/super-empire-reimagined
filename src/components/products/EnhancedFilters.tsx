import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Search, Filter, ChevronDown, X, DollarSign, Package, Building2, Tags } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  categories: string[];
  subcategories: string[];
  departments: string[];
  tags: string[];
  priceRange: [number, number];
  stockStatus: string[];
  sortBy: string;
}

interface EnhancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCategories: { value: string; label: string; count: number }[];
  availableSubcategories: string[];
  availableDepartments: string[];
  availableTags: string[];
  priceMin: number;
  priceMax: number;
  productCount: number;
}

export const EnhancedFilters = ({
  filters,
  onFiltersChange,
  availableCategories,
  availableSubcategories,
  availableDepartments,
  availableTags,
  priceMin,
  priceMax,
  productCount,
}: EnhancedFiltersProps) => {
  const [priceOpen, setPriceOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const toggleSubcategory = (subcategory: string) => {
    const newSubcategories = filters.subcategories.includes(subcategory)
      ? filters.subcategories.filter((s) => s !== subcategory)
      : [...filters.subcategories, subcategory];
    updateFilters({ subcategories: newSubcategories });
  };

  const toggleDepartment = (department: string) => {
    const newDepartments = filters.departments.includes(department)
      ? filters.departments.filter((d) => d !== department)
      : [...filters.departments, department];
    updateFilters({ departments: newDepartments });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  };

  const toggleStockStatus = (status: string) => {
    const newStatus = filters.stockStatus.includes(status)
      ? filters.stockStatus.filter((s) => s !== status)
      : [...filters.stockStatus, status];
    updateFilters({ stockStatus: newStatus });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchQuery: '',
      categories: [],
      subcategories: [],
      departments: [],
      tags: [],
      priceRange: [priceMin, priceMax],
      stockStatus: [],
      sortBy: 'name-asc',
    });
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.categories.length > 0 ||
    filters.subcategories.length > 0 ||
    filters.departments.length > 0 ||
    filters.tags.length > 0 ||
    filters.priceRange[0] !== priceMin ||
    filters.priceRange[1] !== priceMax ||
    filters.stockStatus.length > 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Bar */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
            Search Products
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by name, category..."
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Slider */}
        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between w-full py-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price Range
              </Label>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-2">
            <div className="px-2">
              <Slider
                min={priceMin}
                max={priceMax}
                step={0.5}
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Category Multi-Select */}
        <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between w-full py-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Categories
                {filters.categories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.categories.length}
                  </Badge>
                )}
              </Label>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            {availableCategories.map((category) => (
              <div key={category.value} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={filters.categories.includes(category.value)}
                    onCheckedChange={() => toggleCategory(category.value)}
                  />
                  <label
                    htmlFor={`category-${category.value}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Subcategory Multi-Select */}
        {availableSubcategories.length > 0 && (
          <Collapsible open={subcategoryOpen} onOpenChange={setSubcategoryOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full py-2">
                <Label className="text-sm font-medium">
                  Subcategories
                  {filters.subcategories.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {filters.subcategories.length}
                    </Badge>
                  )}
                </Label>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${subcategoryOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2 max-h-64 overflow-y-auto">
              {availableSubcategories.map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subcategory-${subcategory}`}
                    checked={filters.subcategories.includes(subcategory)}
                    onCheckedChange={() => toggleSubcategory(subcategory)}
                  />
                  <label
                    htmlFor={`subcategory-${subcategory}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Department Multi-Select */}
        {availableDepartments.length > 0 && (
          <Collapsible open={departmentOpen} onOpenChange={setDepartmentOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full py-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Departments
                  {filters.departments.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {filters.departments.length}
                    </Badge>
                  )}
                </Label>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${departmentOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {availableDepartments.map((department) => (
                <div key={department} className="flex items-center space-x-2">
                  <Checkbox
                    id={`department-${department}`}
                    checked={filters.departments.includes(department)}
                    onCheckedChange={() => toggleDepartment(department)}
                  />
                  <label
                    htmlFor={`department-${department}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {department}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Product Tags Multi-Select */}
        {availableTags.length > 0 && (
          <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full py-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Product Tags
                  {filters.tags.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {filters.tags.length}
                    </Badge>
                  )}
                </Label>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${tagsOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag.replace(/-/g, ' ')}
                  </Badge>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Stock Status Filter */}
        <Collapsible open={stockOpen} onOpenChange={setStockOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between w-full py-2">
              <Label className="text-sm font-medium">
                Availability
                {filters.stockStatus.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.stockStatus.length}
                  </Badge>
                )}
              </Label>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${stockOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stock-in"
                checked={filters.stockStatus.includes('in-stock')}
                onCheckedChange={() => toggleStockStatus('in-stock')}
              />
              <label
                htmlFor="stock-in"
                className="text-sm font-normal leading-none cursor-pointer"
              >
                In Stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stock-low"
                checked={filters.stockStatus.includes('low-stock')}
                onCheckedChange={() => toggleStockStatus('low-stock')}
              />
              <label
                htmlFor="stock-low"
                className="text-sm font-normal leading-none cursor-pointer"
              >
                Low Stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stock-out"
                checked={filters.stockStatus.includes('out-of-stock')}
                onCheckedChange={() => toggleStockStatus('out-of-stock')}
              />
              <label
                htmlFor="stock-out"
                className="text-sm font-normal leading-none cursor-pointer"
              >
                Out of Stock
              </label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Results Summary */}
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-green-600">{productCount}</span> products
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
