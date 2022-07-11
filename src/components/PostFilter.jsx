import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>

            <MyInput
                value={filter.query}
                placeholder="Поиск по названию..."
                onChange={event => setFilter({...filter, query: event.target.value})}
            />

            <MySelect
                // принимаем в selectedSort title/body (в зависимости от выбранного фильтра) и сетаем значение сортировки в состоянии фильтра
                value={filter.sort}
                onChange1={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка по:"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
    );
};

export default PostFilter;