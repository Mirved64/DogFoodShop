import "./form.module.css";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField/FormField";
import api from "../../utils/api";
import { useCallback, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const emailPattern = {
  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  message: "Email должен содержать буквы латинского алфавита, цифры и символ @",
};

function LoginForm({ close, setUserName }) {

  const { setCurrentUser } = useContext(UserContext);
  const { setToken } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = useCallback((data) => {
    const { email, password } = data;
    api.signIn(email, password).then((obj) => {
      api.setToken(obj.token);
      setToken(obj.token);
      localStorage.setItem("token", obj.token);
      setCurrentUser(obj.data)
      setUserName(obj.data.name)
      close()
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Логин</h3>

        <FormField
          title="Email"
          name="email"
          pattern={emailPattern}
          register={register}
          errors={errors}
        />

        <FormField
          title="Пароль"
          name="password"
          type="password"
          register={register}
          errors={errors}
        />

        <button>Логин</button>
      </form>
    </>
  );
}

export default LoginForm;
