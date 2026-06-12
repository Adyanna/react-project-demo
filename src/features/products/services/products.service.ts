import type { Product, ProductoCreateDTO, UploadResponse,ProductUpdateDTO } from "../entities.ts/product.entity"

const URL = 'http://localhost:8000/api/products';

//const URL = 'http://localhost:8000/api/lalalal';

export const getProducts = async (): Promise<Product[]> => {

    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error("Error en la obtencion de datos");
        }
        return res.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
    }
}


export const getProductById = async (id: string): Promise<Product> => {
    try {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) {
            throw new Error("Error en la obtencion de datos");
        }
        return res.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
    }
}

export const createProduct = async (producto: ProductoCreateDTO): Promise<Product> => {
    const token = localStorage.getItem('token')||sessionStorage.getItem('token');
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(producto)
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto, por favor intenta de nuevo más tarde');
        }
        const data = await response.json();
        return data;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la conexion');
    }
}

export const uploadImage = async (imageFile: File): Promise<string>=>{
    const URL = 'http://localhost:8000/upload';
    const formData =new FormData();
    try {
        formData.append("file",imageFile)
        const response = await fetch(URL, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto, por favor intenta de nuevo más tarde');
        }
        const data:UploadResponse = await response.json();
        return data.path;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
    }
}


export async function updateProduct(idprd:string, dataprd:ProductUpdateDTO):Promise<Product>  {
    const url = `${URL}/${idprd}`;
    try {
        const token = localStorage.getItem('token')||sessionStorage.getItem('token');
        if (!token) {
            throw new Error("Por favor, vuelva a iniciar session");
        }
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(dataprd)
        });
        if (!response.ok) {
            throw new Error("Error al editar los datos");
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error("Error al editar los datos");
    }
}

export async function deleteProduct(idprd:string):Promise<null>{
    const url = `${URL}/${idprd}`;
    console.log("ELIMINAR PRODUCTO: ",idprd);
    try {
        const token = localStorage.getItem('token')||sessionStorage.getItem('token');
        if (!token) {
            throw new Error("Por favor, vuelva a iniciar session");
        }
        const response = await fetch(url,{method:'DELETE'});
        if (!response.ok) {
            throw new Error("Error al eliminar el producto");
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error("Error al eliminar el producto");
    }
}
