import React from 'react'

const Content = (props) => {
    return (
        <>
            <Part part={props.part} exercise={props.exercise} />
        </>
    )
}

const Part = ({ part, exercise }) => {
    return (
        <p>
            {part} {exercise}
        </p>
    )
}

export default Content