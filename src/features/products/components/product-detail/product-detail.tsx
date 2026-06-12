import { useEffect, useState } from "react";
import type { Product, ProductUpdateDTO } from "@features/products/entities.ts/product.entity";
import { getProductById, uploadImage, updateProduct, deleteProduct } from "@features/products/services/products.service";
import { ProductForm } from "@features/products/components/product-form/product-form";
import { NotFoundPage } from "@core/components/not-found/not-found";
import { Spinner } from "@core/components/spinner/spinner";
import { ConfirmDialog } from "@core/components/confirm-dialog/confirm-dialog";
import { getTags } from "@features/products/services/tags.service";
import { getMe } from "@features/auth/services/auth.service";
import { useNavigate } from "react-router";
import type { NotificactionData } from "@core/types/core-types";
import { Notification } from "@core/components/notification/notification";


interface Props {
    id?: string;
}
export const ProductDetail = ({ id }: Props) => {
    const navegate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [notification, setNotification] = useState<NotificactionData | null>(null);

    useEffect(() => {
        const loadPrd = async () => {
            try {
                if (!id) {
                    setLoading(false);
                    setProduct(null);
                    return;
                }
                const data = await getProductById(id);
                console.log(data)
                setProduct(data);
                const token = localStorage.getItem('token');
                if (token) {
                    const user = await getMe(token);
                    setIsOwner(user.id === data.ownerId);
                }
                setNotification({
                    title: "Producto cargado",
                    message: "La información del producto se obtuvo correctamente",
                    type: "success"
                });
            } catch (error: unknown) {
                setProduct(null);
                throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
            }
            finally {
                setLoading(false);
            }
        }
        loadPrd();
    }, [id]);


    useEffect(() => {
        const loadTags = async () => {
            const data = await getTags();
            setTags(data);
        }
        loadTags();

    }, [])

    const handleEditProduct = async (id: string, product: ProductUpdateDTO, imageFile: File | null) => {
        try {
            let imagePath = product.imagen
            if (imageFile) {
                imagePath = await uploadImage(imageFile);
                //NO CONTAMOS CON SERVICIO PARA ELIMINAR LA IMAGEN ANTERIOR
                //EL CONSUMO DEL SERVICIO VENDRIA AQUI
            }
            const UpdatePrd = {
                ...product,
                imagen: imagePath,
            }
            const data = await updateProduct(id, UpdatePrd);
            setProduct(data);
            setNotification({
                title: "Producto actualizado",
                message: "Los cambios se guardaron correctamente",
                type: "success"
            });

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'No se pudo guardar los cambios del producto';
            setNotification({
                title: 'Error al actualizar',
                message: errorMessage,
                type: 'error'
            });
            throw new Error(errorMessage);
        }
    }
    const handleDelete = async (product: Product) => {
        if (!product.id) return;
        try {
            await deleteProduct(product.id);
            setNotification({
                title: "Producto eliminado",
                message: "El producto fue eliminado correctamente",
                type: "success"
            });
            setTimeout(() => {
                navegate("/products");
            }, 3000);
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

    if (loading) return <Spinner />
    if (!product) return <NotFoundPage />;

    return (
        <>
            <ProductForm mode="view" product={product} tags={tags} isOwner={isOwner} onEdit={handleEditProduct} ondelete={setShowDeleteDialog} />
            {showDeleteDialog && (
                <ConfirmDialog
                    title="Eliminar producto"
                    message="¿Está seguro que desea eliminar este producto?"
                    onConfirm={() => handleDelete(product!)}
                    onCancel={() => setShowDeleteDialog(false)}
                />
            )}
            {notification && <Notification title={notification.title} message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

        </>
    );


}