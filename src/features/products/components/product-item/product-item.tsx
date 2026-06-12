import type { Product } from "@features/products/entities.ts/product.entity"
import style from './product-item.module.css'

interface Props {
    product: Product;
}

export const ProductItem = ({ product }: Props) => {
    return (
        <div className ={style.item}>
            <h3 className={style.name}>{product.name}</h3>

            <p className={style.description}>{product.description}</p>

            <p className={style.price}>
                Precio: ${product.price}
            </p>

            {product.isOnSale && (
                <span className={style.badgeSale}>En oferta 🔥</span>
            )}

            <p className={style.stock}>
                Stock: {product.stock}
            </p>
        </div>
    )
}