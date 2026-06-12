import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ProductForm } from "../components/product-form/product-form";
import type { ProductoCreateDTO } from "../entities.ts/product.entity";
import type { NotificactionData } from "@core/types/core-types";
import { createProduct, uploadImage } from "../services/products.service";
import { getTags } from "../services/tags.service";
import { getMe } from "@features/auth/services/auth.service";
import { Notification } from "@core/components/notification/notification";


const ProductNew: React.FC = () => {

    const [tags, setTags] = useState<string[]>([]);
    const [notification, setNotification] = useState<NotificactionData | null>(null);
    const navegate = useNavigate();

    useEffect(() => {
        const loadTags = async () => {
            const data = await getTags();
            console.log(data);
            setTags(data);
        }
        loadTags();
    }, []);

    const handleNewProduct = async (product: ProductoCreateDTO, imageFile: File) => {
        const token = localStorage.getItem('token');
        try {
            const imagePath = await uploadImage(imageFile);
            const user = await getMe(token!);
            console.log(user)
            const newProduct = {
                ...product,
                imagen: imagePath,
                ownerId: user.id
            }
            await createProduct(newProduct);
            setNotification({
                title: 'Producto Creado',
                message: 'Los datos fueron guardados correctamente',
                type: 'success'
            });
            setTimeout(() => {
                navegate('/products');
            }, 2000);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error en la obtencion de datos';
            setNotification({
                title: 'Error',
                message: errorMessage,
                type: 'error'
            });
            throw new Error(errorMessage);

        }
    }




    return (
        <>
            <ProductForm mode="create" onCreate={handleNewProduct} tags={tags} />
            {notification && <Notification title={notification.title} message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        </>
    )
}

export default ProductNew