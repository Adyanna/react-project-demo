export type user = {
    username: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    id: string;
}

export type userViewDTO = Omit<user,'password'>;