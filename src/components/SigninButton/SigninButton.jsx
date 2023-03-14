import { useCallback, useEffect, useState } from "react";
import Modal from "../Modal/modal";
import LoginForm from "../LoginForm/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import s from "./SigninButton.module.css";

export function SigninButton() {
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/login") {
      setActive(true);
    }
  }, [location, setActive]);

  const close = useCallback(() => setActive(false), [setActive]);

  const open = useCallback(() => {
    navigate("/login");
    setActive(true);
  }, [setActive]);

  const [userName, setUserName] = useState(null);

  const redirect = useCallback(() => {
    navigate('/')
}, [])

  return (
    <>
      <button onClick={open} className={s.btn}>
        Авторизация
      </button>
      <Modal active={active} setActive={close}>
        <LoginForm setUserName={setUserName} close={close} />
      </Modal>
      <Modal active={!!userName}>
        <div>Здравствуйте, {userName}!</div>
        <button onClick={redirect}>OK</button>
      </Modal>
    </>
  );
}
