import s from './index.module.css';
import cn from 'classnames';


function Header({children, user, onUpdateUser}) {

  const handleClickButtonEdit = (e)=> {
    e.preventDefault();
    onUpdateUser({name: 'Максим', about: 'Ментор'})
  }

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.userInfo}>
          {user?.email && <span>{user?.email}</span>}
          {user?.name && <span>{user?.name}</span>}

          <button className='btn' onClick={handleClickButtonEdit}>Изменить</button>
        </div>
        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
