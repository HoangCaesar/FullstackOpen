import React from 'react'

const Total = ({ parts }) => {

    const totalExerices = parts.reduce((total, item) => total + item.exercises, 0);

    return (
        <p>
            Number of exercises {totalExerices}
        </p>
    )
}

export default Total