import style from './confirm-dialog.module.css'

interface Props {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}


export const ConfirmDialog = ({
    title,
    message,
    onConfirm,
    onCancel
}: Props) => {

    return (
        <div className={style.overlay}>
            <div className={style.dialog}>
                <h3>{title}</h3>

                <p>{message}</p>

                <div className={style.actions}>
                    <button
                        onClick={onCancel}
                        className={style.cancelButton}
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className={style.confirmButton}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};