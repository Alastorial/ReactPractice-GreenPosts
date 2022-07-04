import React, {useState} from 'react';

// функциональные компоненты (рекомендуется)
const Counter = () => {
    const [count, setCount] = useState(0);
    const [row, setRow] = useState("Hello world");
    // useState возвращает первым параметром значение, которые мы передали, а вторым - ф-цию изменения состояния (показываем явно, что в компоненте произошли изменения)

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);

    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            <h1>{row}</h1>
            <input
                value={row}
                type="text"
                onChange={event => setRow(event.target.value)}
                // при вводе нового текста в инпут срабатывает onChange в котором в event кладется событие. при этом мы вызываем
                // ф-цию setRow, которая обновляет значение для row и обновляет компонент, в ней мы обращаемся к элементу,
                // в котором произошло событие (тот же инпут) и к его значению. таким образом, мы выводим текст из инпута в заголовок
                // данное решение называется двухстороннее связывание (добились синхронизации)
            />
        </div>
    );
};
// делаем компонент импортируемым по дефолту
export default Counter;