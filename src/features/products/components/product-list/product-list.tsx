import { useState, useEffect } from "react";
import style from './product-list.module.css'
import type { ProductFiltersData } from "@features/products/entities.ts/product.entity";
import { Link } from "react-router";
import { useProducts } from "./useproduct-list";
import { Spinner } from "@core/components/spinner/spinner";
import { ProductItem } from "@features/products/components/product-item/product-item";
import { NotFoundPage } from "@core/components/not-found/not-found";
import { ProductFilters } from "../product-filter/product-filters";
export const ProductList: React.FC = () => {
    const { products, loading, error } = useProducts();
    const [filters, setFilters] = useState<ProductFiltersData>({ search: "", onlyOnSale: false });

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <NotFoundPage />
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = filters.search.length < 4? true: product.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesSale = !filters.onlyOnSale || product.isOnSale;
        return matchesSearch && matchesSale;
    });

    return (
        <>
            <ProductFilters
                filters={filters}
                onChange={setFilters}
            />
            <ul className={style.productList}>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`} className={style.link}>
                            <ProductItem product={product} />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};