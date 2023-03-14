import { useCallback, useEffect, useState } from "react"
import Modal from "../Modal/modal"
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import { useNavigate, useLocation } from "react-router-dom"
import s from './SignupButton.module.css'

export function SignupButton() {

    const [active, setActive] = useState(false)

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (location.pathname == '/signup') {
            setActive(true)
        }
    }, [location, setActive])

    const close = useCallback(
        () => setActive(false),
        [setActive]
    )

    const open = useCallback(
        () => {
            navigate('/signup')
            setActive(true)
        },
        [setActive]
    )

    return (
        <>
            <button onClick={open} className={s.btn}>
                Зарегистрироваться
            </button>
            <Modal active={active} setActive={close}>
                <RegistrationForm />
            </Modal>
        </>
    )
}