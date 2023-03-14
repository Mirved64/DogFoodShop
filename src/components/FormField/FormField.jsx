import styles from './FormField.module.css'

export function FormField({ title, name, pattern, register, errors, type }) {
    return (
        <div className={styles.container}>
            <label>{title}</label>
            <input
                {...register(name, {
                    required: 'Обязательное поле',
                    pattern
                })}
                type={type || "text"}
                placeholder={title}
            />
            <div className={styles.errorMessage}>
                {errors?.[name] && (
                    <p>{errors?.[name]?.message}</p>
                )}
            </div>
        </div>
    )
}