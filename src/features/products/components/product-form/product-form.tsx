import { useEffect, useState } from "react";
import style from './product-form.module.css'
import type { Product } from "@features/products/entities.ts/product.entity";

interface Props {
    mode?: "create" | "view" | "edit";
    product?: Product;
    onCreate?: (data: Product, imageFile: File) => Promise<void>;
    onEdit?: (id: string, data: Product, imageFile: File | null) => Promise<void>;
    tags: string[];
    isOwner?: boolean;
    ondelete?:(data:boolean)=>void;
}

export const ProductForm = ({ mode, product, onEdit, onCreate, tags, isOwner ,ondelete}: Props) => {
    console.log('TAGS DESDE FORM: ', tags)

    const [form, setForm] = useState<Product>({
        id: "",
        name: "",
        description: "",
        price: 0,
        tags: [],
        imagen: "",
        isOnSale: false,
        stock: 0,
        category: "",
        brand: "",
        rating: 0,
        ownerId: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const numericFields: Array<keyof Product> = ["price", "stock", "rating"]
    const readOnly = mode === "view" && !isEditing;
    //const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    //aqui guardamos los datos originales del producto
    useEffect(() => {
        if (product) {
            setForm(product);
        }
    }, [product]);



    ///////============= CAMBIO DE VALORES EN EL FORMULARIO =================/////////////////
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: numericFields.includes(name as keyof Product) ? Number(value) : value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setForm({
            ...form,
            [name]: checked,
        });
    };

    const handleTagChange = (tag: string) => {
        const exist = form.tags.includes(tag);
        setForm({
            ...form,
            tags: exist ? form.tags.filter(t => t !== tag) : [...form.tags, tag]
        })
    }

    /////////////// ============ CANCELAR EDICION Y RESTAURAR DATOS ============= /////////////

    const handleCancel = () => {
        if (product) {
            setForm(product);
        }
        setIsEditing(false);
    };


    /////////////// ============= EDITAR O CREAR PRODUCTO ==================//////////////
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mode === 'create') {
            if (!imageFile) return;
            onCreate?.(form, imageFile);
            return;
        }
        if (mode === 'view' && isEditing) {
            onEdit?.(form.id, form, imageFile);
            setIsEditing(false);
        }
    }

    console.log('PRODUCTO DESDE FORMULARIO', form)
    return (
        <section className={style.productFormContainer}>
            <div className={style.productForm}>
                <h3 className={style.title}>Detalle Producto</h3>

                {readOnly &&
                    <div className={style.imageContainer}>
                        <img
                            src={form?.imagen}
                            alt={form?.name}
                            className={style.productImage}
                        />
                    </div>
                }

                <form onSubmit={handleSubmit} className={style.form}>

                    <label className={style.controlGroup}>
                        <span>Name:</span>
                        <input name="name" value={form?.name}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    <label className={style.controlGroup}>
                        <span>Description:</span>
                        <textarea
                            name="description"
                            value={form?.description}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    <label className={style.controlGroup}>
                        <span>Price:</span>
                        <input
                            type="number"
                            name="price"
                            value={form?.price}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    {!readOnly &&
                        <label className={style.controlGroup}>
                            <span>Imagen:</span>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => { setImageFile(e.target.files?.[0] ?? null) }}
                            />
                        </label>
                    }

                    <label className={style.controlGroup}>
                        <span>Category:</span>
                        <input
                            name="category"
                            value={form?.category}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    <label className={style.controlGroup}>
                        <span>Brand:</span>
                        <input
                            name="brand"
                            value={form?.brand}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    <label className={style.controlGroup}>
                        <span>Stock:</span>
                        <input
                            type="number"
                            name="stock"
                            value={form?.stock}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    <label className={style.controlGroup}>
                        <span>
                            Rating:
                        </span>
                        <input
                            type="number"
                            name="rating"
                            value={form?.rating ?? ""}
                            onChange={readOnly ? undefined : handleChange}
                            readOnly={readOnly}
                        />
                    </label>

                    <label className={style.controlGroup}>
                        <span>
                            Tags:
                        </span>
                        <div className={style.tagsContainer}>
                            {tags.map((tag) => (
                                <label key={tag} className={style.tagItem}>
                                    <span>
                                        {tag}
                                    </span>
                                    <input
                                        name="tags"
                                        type="checkbox"
                                        checked={form.tags.includes(tag)}
                                        disabled={readOnly}
                                        onChange={() => handleTagChange(tag)}
                                    />
                                </label>
                            ))
                            }
                        </div>
                    </label>

                    <label className={style.checkboxGroup}>
                        <span>
                            On Sale:
                        </span>
                        <input
                            type="checkbox"
                            name="isOnSale"
                            checked={form?.isOnSale ?? false}
                            onChange={readOnly ? undefined : handleCheckboxChange}
                            readOnly={readOnly}
                        />
                    </label>

                    {!product && <button type="submit" className={style.submitButton}>Guardar cambios</button>}
                    {isOwner && (
                        <div >
                            {!isEditing &&
                                <div className={style.actions}>
                                    <button className={style.editButton}
                                        onClick={() => setIsEditing(true)}
                                    >Editar</button>

                                    <button className={style.deleteButton}
                                    onClick={()=> ondelete?.(true)}
                                    >Eliminar</button>
                                </div>
                            }
                            {isEditing &&
                                <div className={style.actions}>

                                    <button type="submit" className={style.saveButton}>Guardar</button>

                                    <button className={style.cancelButton}
                                        onClick={handleCancel}
                                    >Cancelar</button>
                                </div>
                            }
                        </div>
                    )}
                </form>

            </div>
        </section>
    );

}