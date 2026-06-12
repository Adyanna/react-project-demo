import { Link } from "react-router";
import style from "./not-found.module.css";

export const NotFoundPage = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>404</h1>

            <p className={style.message}>
                La página que buscas no existe.
            </p>

            <Link
                to="/"
                className={style.link}
            >
                Volver al inicio
            </Link>
        </div>
    );
};