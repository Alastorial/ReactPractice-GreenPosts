import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useHistory} from "react-router-dom";

const PostItem = (props) => {
    const router = useHistory()  // если вывести в консоль, то будет видно, что хук позволяет использовать некоторые методы
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                {/* используем хук, одна из возможностей которого - изменять адресную строку без Link */}
                {/* мы передаем в новый адрес id поста, а роуте пишем такой адрес, который поймет, что мы передаем id */}
                <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>Открыть</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;