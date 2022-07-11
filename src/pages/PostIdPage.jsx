import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();  // возвращает переменные, которые в ссылке

    // состояние полученного с сервера поста по id
    const [post, setPost] = useState({});

    // состояние комментариев, полученных к данному посту по id
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        console.log(id);
        const response = await PostService.getById(params.id);
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    // TODO почему-то в fetchPostById не удается получить id, который мы передаем при вызове

    useEffect(() => {
        console.log(params.id + " sdfg")
        const id = params.id;
        fetchPostById(id);
        fetchComments(id);
    }, [])

    return (
        <div className="App">

            {isLoading
                ? <Loader/> :
                <div>
                    <h1>Вы открыли страницу поста с ID = {params.id}</h1>
                        {post.id}. {post.title}
                    <h1>Комментарии</h1>

                </div>
            }

            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div style={{marginTop: 15}} key={comm.id}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;