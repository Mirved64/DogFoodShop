import { SignupButton } from "../../components/SignupButton/SignupButton"
import { SigninButton } from "../../components/SigninButton/SigninButton"
import s from './MainPage.module.css'

export function MainPage() {

    return (
        <div className={s.container}>
          <h1>Dog Food - лучший магазин!</h1>
          <SignupButton/>
          <SigninButton/>
        </div>
    )
}