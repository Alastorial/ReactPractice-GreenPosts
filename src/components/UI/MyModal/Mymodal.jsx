import React from 'react';
import cl from './MyModal.module.css'

const Mymodal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal] // массив с текущими классами для css
    if(visible) { // если модалку видно, то добавляем класс active
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Mymodal;