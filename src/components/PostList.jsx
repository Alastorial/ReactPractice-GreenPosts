import React from 'react';
import PostItem from "./PostItem";

// здесь принимаем не пропс а сразу объект, что позволяет сразу деструктуризировать полученные данные
// аналогичный пример проиходит на 13 строке, но в постАйтм мы уже используем props. хотя могли сделать так же
const PostList = ({posts, title}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>

            {/*с помощью map мы проходим по всему массиву и создаем jsx PostItem с параметрами из массива, которые передаем в пропс*/}
            {posts.map((post, index) => // index - встроенных второй параметр, возвращаемый map - просто итератор
                    <PostItem number={index + 1} post={post} key={post.id}/>
                // <PostItem post={{id: post.id, title: post.title, body: post.body}}/>
            )}
        </div>
    );
};

export default PostList;