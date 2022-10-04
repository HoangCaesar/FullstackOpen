import React from 'react'

const Content = ({ parts }) => {
    return (
        <>
        {
            parts.map(part => {
                return <Part key={part.name} name={part.name} exercises={part.exercises} />
            })
        }
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

export default Content