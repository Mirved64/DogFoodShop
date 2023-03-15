import "./form.module.css";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField/FormField";
import api from "../../utils/api";
import Modal from "../Modal/modal";
import { useState, useCallback, useEffect } from "react";

const emailPattern = {
  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  message: "Email должен содержать буквы латинского алфавита, цифры и символ @",
};

const passwordPattern = {
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  message:
    "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру",
};

function RegistrationForm({hide}) {
  
  const [successModalActive, setSuccessModalActive] = useState(false);
  const [errorModalActive, setErrorModalActive] = useState(false);
  const [serverErrorModalActive, setServerErrorModalActive] = useState(false);
  const [err, setErr] = useState({})

  useEffect(() => {
    setSuccessModalActive(false);
  }, [setSuccessModalActive]);

  useEffect(() => {
    setErrorModalActive(false);
  }, [setErrorModalActive]);

  useEffect(() => {
    setServerErrorModalActive(false);
  }, [setServerErrorModalActive]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = useCallback((data) => {
    const { email, group, password } = data;
    api
      .signUp(email, group, password)
      .then(() => setSuccessModalActive(true))
      .catch((obj) => {
        if (obj === 'Ошибка: 409') {
          setErrorModalActive(true)
        } else {
          setServerErrorModalActive(true)
        }
      });
      
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Регистрация</h3>

        <FormField
          title="Email"
          name="email"
          pattern={emailPattern}
          register={register}
          errors={errors}
        />

        <FormField
          title="Группа"
          name="group"
          register={register}
          errors={errors}
        />

        <FormField
          title="Пароль"
          name="password"
          type="password"
          pattern={passwordPattern}
          register={register}
          errors={errors}
        />

        <button>Зарегистрироваться</button>
      </form>

      <Modal active={successModalActive} setActive={setSuccessModalActive}>
        <h4>Вы успешно зарегистрировались!</h4>
        <button 
          onClick={() => {
            setSuccessModalActive(false)
            hide()
            }} > 
          OK
        </button>
      </Modal>
      <Modal active={errorModalActive} setActive={setErrorModalActive}>
        <h4>Пользователь с указанным email уже существует</h4>
        <button 
          onClick={() => {
            setErrorModalActive(false)
            }}>
          OK
        </button>
      </Modal>
      <Modal active={serverErrorModalActive} setActive={setServerErrorModalActive}>
        <h4>Проблемы с сервером</h4>
        <button 
          onClick={() => {
            setServerErrorModalActive(false)
            hide()
            }}>
          OK
        </button>
      </Modal>
    </>
  );
}

export default RegistrationForm;
