import style from './hero.module.css'
import { Link } from 'react-router'

export const Hero:React.FC =()=>{
    return(
        <section className={style.hero}>
            <h1 className={style.title}>Bienvenido a MPRACTICE</h1>
            <p className={style.sutitle}>Compra, vende y descubre productos de forma rapida y segura.</p>
            <Link to='/products' className={style.button}>
                    Explorar Productos
            </Link>
        </section>
    )
}