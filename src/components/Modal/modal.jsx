import cn from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import './index.scss';

function Modal({children, active, setActive}) {

  function onClose() {
    setActive(false);
  }

    return (
      <div className={cn('modal', {['active']: active})} onClick={onClose}>
        <div className={cn('modal_content', {['active']: active})} onClick={e => e.stopPropagation()}>
            {children}
        </div>
      </div>
    );
  };
  
  export default Modal;