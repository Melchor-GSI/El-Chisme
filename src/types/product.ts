export type Product = {
  id: number;
  name: string | null;
  description?: string | null;
  image: string | null;
  price: number;
  quantity: number;
  categoryId: number | null;
  createdAt?: Date;
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

// export type GetProductDto = {
//   name: string;
//   description: string;
//   price: number | null;
//   image: string | null;
//   store: {
//     id: number;
//     name: string;
//     contact_information: string | null;
//     opening_hours: Date | null;
//     location: {
//       lat: number;
//       lng: number;
//     }
//   } | null;
// };

export type GetProductDto = {
  id: number;
  name: string;
  contact_information: string | null;
  opening_hours: Date | null;
  lat: number;
  lng: number;
  products: {
    id: number;
    name: string;
    description: string;
    price: number | null;
    image: string | null;
  }[];
};

export type CreateProductDto = {
  name: string;
  image?: string;
  categoryId: number;
  description: string;
};

export type CreateStoreProductDto = {
  product: CreateProductDto;
  price: number;
  quantity: number;
  storeId: number;
};
