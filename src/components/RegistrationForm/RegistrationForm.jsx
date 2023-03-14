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

function RegistrationForm() {
  const [successModalActive, setSuccessModalActive] = useState(false);

  useEffect(() => {
    setSuccessModalActive(false);
  }, [setSuccessModalActive]);

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
      .then((obj) => {
        if (obj.ok) {
          setSuccessModalActive(true);
        } else {
          alert(obj.message);
        }
      })
      .catch(() => {
        alert("Ошибка сервера");
      });
  }, []);

  const close = useCallback(() => setSuccessModalActive(false), []);

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

      <Modal active={successModalActive} setActive={close}>
        Вы успешно зарегистрировались!
        <button onClick={close}>OK</button>
      </Modal>
    </>
  );
}

export default RegistrationForm;
