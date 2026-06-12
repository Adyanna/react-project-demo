import style from './features.module.css'

export const Features: React.FC = () => {
    return (
        <section className={style.features}>
            <article className={style.card}>
                <h2 className={style.title}>🛍️ Compra</h2>
                <p className={style.text}>Encuentra productos publicados por otros usuarios.</p>
            </article>

            <article className={style.card}>
                <h2 className={style.title}>🚀 Publica</h2>
                <p>Publica tus productos en pocos minutos.</p>
            </article>

            <article className={style.card}>
                <h2 className={style.title}>🔒 Seguro</h2>
                <p className={style.text}>Gestiona tus publicaciones desde tu cuenta.</p>
            </article>
        </section>
    );
};