import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useState} from "react";

// приняли ссылку на нашу функцию из App как пропс
const PostForm = ({create}) => {

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
        const newPost = {
            ...post, id: Date.now()
        }
        // вызвали переданную функцию как пропс (судя по всем передается ссылка на нее, поэтому функционал работает даже в другом компоненте)
        create(newPost);
        // обновляем значения переменных инпутов
        setPost({title: '', body: ''});
    }

    return (
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
    );
};

export default PostForm;