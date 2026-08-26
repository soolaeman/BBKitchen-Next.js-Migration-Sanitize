export type AvailabilityStatus = 'READY' | 'SOLD' | 'BOOKED' | 'CONFIRMING';

export type EquipmentCategory =
  | 'All'
  | 'Cooking'
  | 'Fryer'
  | 'Bakery'
  | 'Chiller & Freezer'
  | 'Display'
  | 'Fabrication'
  | 'Exhaust'
  | 'Food Processing'
  | 'Beverage'
  | 'Washing & Sink';

export interface Product {
  id: string;
  slug?: string;
  sku: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  price: number | null;
  status: AvailabilityStatus;
  condition: string;
  location: string;
  summary: string;
  description: string;
  images: string[];
  dateAdded: string;
  featured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: EquipmentCategory;
  condition: string;
  location: string;
  statusFilter: 'ALL' | 'READY_ONLY' | 'INCLUDE_SOLD';
  minPrice: number | null;
  maxPrice: number | null;
}
