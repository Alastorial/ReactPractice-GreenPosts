import {useMemo} from "react";

export const useSortedPosts = (posts, sortMethod) => {
    // если меняются зависимости, то отсортированный (и финальный) массив вычисляется заново
    const sortedPosts = useMemo(() => {
        console.log("Отработала ф-ция сортировки")
        if(sortMethod) {  // если выбрана сортировка, то возвращаем отсортированный массив
            return [...posts].sort((a, b) => a[sortMethod].localeCompare(b[sortMethod]));
        }
        return posts;  // иначе просто исходный
    }, [sortMethod, posts]);

    return sortedPosts;
}


export const usePosts = (posts, sortMethod, query) => {
    const sortedPosts = useSortedPosts(posts, sortMethod);

    const sortedAndSearchedPosts = useMemo(() => {
        console.log("Отработала функция фильтрации по поиску");
        return sortedPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}