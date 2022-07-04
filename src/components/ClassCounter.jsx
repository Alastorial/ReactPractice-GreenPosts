import React from "react";

// устаревший подход - классовые компоненты
class ClassCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { // зарезервированное свойство
            count: 4,
            row: "hello world"
        }
        // как я понял - мы привязываем метод к state с его переменной count
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    increment() {
        this.setState({count: this.state.count + 1})
    }

    decrement() {
        this.setState({count: this.state.count - 1})
    }

    render () {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
                <h1>{this.state.row}</h1>
                <input
                    type="text"
                    onChange={event => this.setState({row: event.target.value})}
                    // при вводе нового текста в инпут срабатывает onChange в котором в event кладется событие. при этом мы вызываем
                    // ф-цию setRow, которая обновляет значение для row и обновляет компонент, в ней мы обращаемся к элементу,
                    // в котором произошло событие (тот же инпут) и к его значению. таким образом, мы выводим текст из инпута в заголовок
                    // данное решение называется двухстороннее связывание (добились синхронизации)
                />
            </div>
        )
    }
}

export default ClassCounter;