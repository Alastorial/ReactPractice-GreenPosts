import React from 'react';
import classes from "./MyButton.module.css";
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}  {/* суть в том, что мы передали отдельно пропсом текст в children, а остальные пропсы указываем как свойства кнопки */}
        </button>
    );
};

export default MyButton;