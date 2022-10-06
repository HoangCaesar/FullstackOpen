import { Content, Header } from '../components';

const Course = ({ courses }) => {
    return (
        <div>
            {
                courses.map(
                    course =>
                        <div key={course.id}>
                            <Header header={course.name} />
                            <Content parts={course.parts} />
                        </div>
                )
            }
        </div>
    )
}

export default Course