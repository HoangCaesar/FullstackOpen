import Part from './Part';

const Content = ({ parts }) => {

    const total = parts.reduce((total, part) => total + part.exercises, 0);

    return (
        <>
            {
                parts.map(part => <Part key={part.id} part={part} />)
            }
            <h4>Total of {total} exercises</h4>
        </>
    )
}

export default Content