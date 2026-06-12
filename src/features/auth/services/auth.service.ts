import type { userViewDTO } from "../entities/auth.entity";

const url = 'http://localhost:8000/auth';

export async function loginUser(username: string, password: string) {

    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
        const data = await response.json();
        return data.accessToken;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');
    }
}

export async function getMe(token: string):Promise<userViewDTO> {
    try {

        const response = await fetch(`${url}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
            }
        });
        const data = await response.json();
        if (!response.ok) {
            console.log(response);
            throw new Error('Error al obtener el usuario. Por favor, inténtalo de nuevo.');
        }
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Error en la obtencion de datos');

    }

}