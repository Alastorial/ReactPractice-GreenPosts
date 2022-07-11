import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import Mymodal from "../components/UI/MyModal/Mymodal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([
        // {id: 1, title: "JavaScript", body: "Description: JavaScript - язык программирования"},
        // {id: 2, title: "JavaScript 2", body: "Description: JavaScript - язык программирования"},
        // {id: 3, title: "JavaScript 3", body: "Description: JavaScript - язык программирования"},
        // {id: 4, title: "aaaa 3", body: "sdfasdf"},
        // {id: 5, title: "ffff 3", body: "hgfhfg"},
        // {id: 6, title: "bbbb 3", body: "asdf"},

    ]);

    // выбранная сортировка
    // const [selectedSort, setSelectedSort] = useState('');

    // значение в поиске
    // const [searchQuery, setSearchQuery] = useState('');

    // создали одну переменную состояния с двумя параметрами, что описывались ранее выше
    const [filter, setFilter] = useState({sort: '', query: ''})

    // зависимость состояния модального окна
    const [modal, setModal] = useState(false)

    // наш собственный хук, в котором сначала сортируется, потом фильтруется список с постами
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    // общее кол-во постов, которые мы можем получить с сервера (получаем это число с сервера)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);  // также используется как текущая страница

    const lastElement = useRef();  // кладем сюда ссылку на объект, за которым следим
    console.log(lastElement);

    // используя данных хук, мы кладем в fetchPosts функцию, которую возвращает
    // данный хук, а в useEffect вызываем ее. Также хук возвращает состояние загрузки и лог ошибки (если нет, то пустую строку)
    // в данном случае сначала isPostsLoading и postsError будут такими, какими мы его задали при объявлении состояния
    const [fetchPosts, isPostsLoading, postsError] = useFetching( async () => {
        // получаем посты с сервера, используем лимит и page для включения пагинации
        console.log(limit + " лимит")
        const response = await PostService.getAll(limit, page);  // получаем 10 постов с 1 страницы
        setPosts([...posts, ...response.data]);  // сетаем посты для отрисовки
        const totalCount = response.headers['x-total-count'];  // всего постов
        setTotalPages(getPageCount(totalCount, limit)); // сетаем общее кол-во страниц

    });

    // TODO следует помнить, что некоторые данные не сразу подгружаются, но в конце концов
    // они появятся на странице, по мере заполнения

    console.log(page, totalPages)
    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    } )


    useEffect(() => {
        fetchPosts();
    }, [page, limit])  // чтобы только после обновления значения текущей страницы у нас подгружались новые посты
    console.log(isPostsLoading)


    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }


    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={fetchPosts}>GET POSTS</MyButton>
            {/*<hr style={{margin: "15px 0"}}/>*/}
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>

            <Mymodal visible={modal} setVisible={setModal}>
                {/* передаем в пропсы нашу функцию createPost под названием create */}
                <PostForm create={createPost}/>
            </Mymodal>


            <hr style={{margin: "15px 0"}}/>

            {/* фильтрация по поиску и по алфавиту (по названию и по описанию) */}
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect
                value={limit}
                onChange1={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'}
                ]}
            />

            {postsError &&
                <h1>Произошла ошибка - {postsError}</h1>
            }

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов про JS'}/>

            {/* мы создали референс и привязали этот блок к референсу lastElement */}
            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>

            {/* если идет загрузка, то показываем крутилку, иначе посты */}
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            {/* передаем в PostList пропсы */}

            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />


            {/*<Counter/>*/}
            {/*<Counter/>*/}
            {/*<ClassCounter/>*/}
        </div>
    );
}

export default Posts;
