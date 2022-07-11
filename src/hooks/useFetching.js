import {useState} from "react";
// наш собственный хук, в который передается колбэк, а хук возвращает
// функцию с этим колбэком, состояние загрузки и ошибку
export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetching = async (...props) => {
        try {
            setError('');
            setIsLoading(true);
            await callback(...props);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}
