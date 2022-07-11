import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    // хук будет срабатывать, когда мы будем видеть самый нижний блок постов (для подгрузки новых)
    const observer = useRef(); // кладем сюда ссылку на объект наблюдатель
    useEffect(() => {
        // если идет загрузка постов, то не надо опять вызывать подгрузку постов
        if (isLoading) return;

        // если в наблюдателе что-то есть - чистим его, чтобы не было лишних-страрых наблюдателей
        if (observer.current) observer.current.disconnect();

        let options = {
            root: document
        } // корневой элемент по умолчанию document, по этому опции можно не использовать (а нет, без этого не работает)

        // функция обратного вызова при наблюдении объекта
        // entries - массив наблюдаемых элементов. свойство isIntersecting у элемента
        // говорит о том, видим ли мы его или нет true/false
        let cb = function(entries, observer){
            console.log('cb')
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        }

        // наблюдатель
        observer.current = new IntersectionObserver(cb, options);
        // устанавливаем, за чем наблюдаем
        observer.current.observe(ref.current);
    }, [isLoading])
}