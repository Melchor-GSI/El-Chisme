export type Product = {
  id: number;
  name: string;
  price: number | null;
  categoryId: number | null;
  createdAt: Date | null;
};

export type ProductFilter = {
  name?: string;
  priceMin?: string;
  priceMax?: string;
  currency?: string;
  categoryId?: string;
};

export type Category = {
  id: number;
  name: string;
  createdAt: Date | null;
};

export type GetProductDto = {
  name: string;
  description: string;
  price: number |null;
  image: string | null;
  store: {
    id: number;
    name: string;
    contact_information: string | null;
    opening_hours: Date | null;
    lat: number;
    long: number;
  } | null;
};