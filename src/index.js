import React from 'react'; // ядро реакта
import ReactDOM from 'react-dom/client';  // нужно для монтирования компонент в приложение
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // передаем блок, в который будем компонент монтировать
root.render(  // передаем копонент, который необходимо будет отрисовать
    <App/>
);


