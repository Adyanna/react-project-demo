
const URL = 'http://localhost:8000/api/tags';

export const getTags= async (): Promise<string[]> => {
    console.log('TAGS')
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error("Error en la obtencion de datos");
        }
        console.log(res)
        return res.json();
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
    }
}