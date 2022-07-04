import React, {useRef, useState} from "react";
import Counter from "./components/Counter";
import PostList from "./components/PostList";
import PostItem from "./components/PostItem";
import './styles/App.css'
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
// import ClassCounter from "./components/ClassCounter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "JavaScript", body: "Description: JavaScript - язык программирования"},
        {id: 2, title: "JavaScript 2", body: "Description: JavaScript - язык программирования"},
        {id: 3, title: "JavaScript 3", body: "Description: JavaScript - язык программирования"},

    ]);

    // 1 способ: получение данных из управляемого инпута
    // в общем этот хук позволяет изменять на странице значения компонентов (в данном случае в компонентах будет меняться post)
    // то есть если где-то в коде изменится значение post, то и на странице все изменится
    const [post, setPost] = useState({title: '', body: ''});

    // изначально для каждого инпута мы прописывали состояния, потом решили сделать объект с полями, которые отвечают за каждый инпут
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');

    // 2 способ: получение данных из неуправляемого инпута
    // const bodyInputRef = useRef(); // получение доступа к дом элементу и у него забрать занчение


    const addNewPost = (e) => {
        e.preventDefault(); // страница перестает обновляться
        // обновляем значение массива с постами
        setPosts([...posts, {...post, id:Date.now()}])
        // обновляем значения переменных инпутов
        setPost({title: '', body: ''});
    }


    return (
        <div className="App">

            <form>
                {/* Управляемый компонент (1 способ) */}
                <MyInput
                    value={post.title}
                    // мы обновляем объект post при этом переписываем значение поля title
                    onChange={e => setPost({...post, title: e.target.value})}  // это необходимо для постоянного обновления значения title при вводе/удаления текста
                    type="text"
                    placeholder="Название поста"
                />
                <MyInput
                    value={post.body}
                    onChange={e => setPost({...post, body: e.target.value})}  // это необходимо для постоянного обновления значения body при вводе/удаления текста
                    type="text"
                    placeholder="Описание поста"
                />
                {/* 2 способ неуправляемый компонент (неконтролируемый)*/}
                {/*<MyInput*/}
                {/*    ref={bodyInputRef}*/}
                {/*    type="text"*/}
                {/*    placeholder="Описание поста"*/}
                {/*/>*/}
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
                {/*<MyButton disabled>Создать пост</MyButton>*/}
            </form>

            {/* передаем в PostList пропсы */}
            <PostList posts={posts} title={'Список постов про JS'}/>

            <Counter/>
            {/*<Counter/>*/}
            {/*<ClassCounter/>*/}
        </div>
    );
}

export default App;
