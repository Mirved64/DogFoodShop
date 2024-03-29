import s from './index.module.css';
import cn from 'classnames';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as FavoriteIcon} from './img/favorites.svg';

function Header({children}) {
  const { favorites } = useContext(CardContext);

  const { user } = useContext(UserContext)
  const { setCurrentUser } = useContext(UserContext) 

  useEffect(() => {
    setCurrentUser(user)
  }, [user])
  
  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.userInfo}>
          {user?.email && <span>{user?.email}</span>}
          {user?.name && <span>{user?.name}</span>}
          {user?.about && <span>{user?.about}</span>}
        </div>
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{pathname:"/favorites", state: 'sfsdfsdf'}}>
              <FavoriteIcon/>
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
