import React from 'react';

const MySelect = ({options, defaultValue, value, onChange1}) => {
    return (
        <select
            // при изменении селекта возвращаем значение, которое выбрали (например: по названию - title)
            value={value}
            onChange={event => onChange1(event.target.value)}
        >
            {/* при смене опции вызываем ф-цию, которую передали пропсом */}

            <option disabled value="">{defaultValue}</option>
            {/* создаем опции свои */}
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}

        </select>
    );
};

export default MySelect;