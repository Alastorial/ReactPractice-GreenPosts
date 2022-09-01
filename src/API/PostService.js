import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        // мы указываем здесь дополнительные query параметры для сервера, чтобы он вернул нам общее кол-во постов (так работает просто)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
            // таким образом мы форматируем ссылку (встроенный инструмент аксис)
        })
        return response
    }

    static async getById(id) {
        // мы указываем здесь дополнительные query параметры для сервера, чтобы он вернул нам общее кол-во постов (так работает просто)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
}