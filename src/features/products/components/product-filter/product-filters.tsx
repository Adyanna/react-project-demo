import styles from "./product-filters.module.css";
import type { ProductFiltersData } from "@features/products/entities.ts/product.entity";


interface Props {
    filters: ProductFiltersData;
    onChange: (filters: ProductFiltersData) => void;
}

export const ProductFilters = ({ filters, onChange }: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        onChange({ ...filters, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value });
    };

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>Filtros</h3>

            <input
                className={styles.search}
                type="text"
                name="search"
                placeholder="Buscar producto..."
                value={filters.search}
                onChange={handleChange}
            />

            <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    name="onlyOnSale"
                    checked={filters.onlyOnSale}
                    onChange={handleChange}
                />
                Solo ofertas
            </label>

            {filters.search.length > 0 &&
                filters.search.length < 4 && (
                    <span className={styles.helperText}>
                        Ingrese al menos 4 caracteres para buscar
                    </span>
                )}
        </section>
    );
};