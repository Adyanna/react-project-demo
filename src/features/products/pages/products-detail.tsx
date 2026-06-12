//import { ProductList } from "../components/product-list/product-list";
import { useParams } from "react-router";
import { ProductDetail } from "../components/product-detail/product-detail";



const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    return (
        <ProductDetail id={id}/>
    );
}

export default ProductDetailPage