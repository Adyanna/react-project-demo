export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imagen: string;
  isOnSale: boolean;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  ownerId: string;
};

export type UploadResponse = {
  path: string;
};

export interface ProductFiltersData {
    search: string;
    onlyOnSale: boolean;
}

export type ProductoCreateDTO = Omit<Product,'id'> ;

export type ProductUpdateDTO = Partial<ProductoCreateDTO>;