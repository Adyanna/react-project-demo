import style from './start.module.css'
import { Link } from 'react-router';

export const Start: React.FC = () => {
    return (
        <section className={style.cta}>
            <h2 className={style.title}>✨ Comienza hoy mismo</h2>
            <p className={style.text}> 
                Crea una cuenta y empieza a publicar
                tus productos.
            </p>
            <Link to='/singin'className={style.button}>Registrarse</Link>
        </section>
    );
};