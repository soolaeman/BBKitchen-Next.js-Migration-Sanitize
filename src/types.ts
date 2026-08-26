export type PortfolioProduct = {
  id: number;
  name: string;
  sku?: string;
  stockStatus?: 'instock' | 'outofstock';
  price?: string;
};

export type HierarchyNode = {
  id: number;
  slug: string;
  parentId?: number;
  title: string;
  path: string;
};
