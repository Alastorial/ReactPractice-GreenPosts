import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

// здесь принимаем не пропс а сразу объект, что позволяет сразу деструктуризировать полученные данные
// аналогичный пример проиходит на 13 строке, но в постАйтм мы уже используем props. хотя могли сделать так же
const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>Посты не были найдены!</h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>

            <TransitionGroup>
                {/*с помощью map мы проходим по всему массиву и создаем jsx PostItem с параметрами из массива, которые передаем в пропс*/}
                {posts.map((post, index) => // index - встроенных второй параметр, возвращаемый map - просто итератор
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                    // при создании списков обязательно необходимо указывать ключ, который должен хранить уникальное значение
                    // индексы элементов в роли ключа нельзя использовать тк при изменинии массива может произойти ситуация, когда получится два одинаковых ключа
                )}
            </TransitionGroup>


        </div>
    );
};

export default PostList;