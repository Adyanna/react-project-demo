import { useEffect, useState } from "react";
import type { Product } from "@features/products/entities.ts/product.entity";
import { getProducts } from "@features/products/services/products.service";

type useProductsType = {
    products: Product[];
    loading: boolean;
    error: string | null;
};

export const useProducts = (): useProductsType => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async(): Promise<void>=>{
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error:unknown) {
                setError(error instanceof Error? error.message:'Error al cargar los productos')
            }
            finally{
                setLoading(false);
            }
        }
        load();
    },[]);

    return {products,loading,error}
}