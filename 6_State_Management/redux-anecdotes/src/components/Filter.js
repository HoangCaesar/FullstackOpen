import { useDispatch } from 'react-redux';

// Project Import
import { filterActions } from '../store/reducers/actions';

// ==========================================|| ANECDOTE FORM ||==========================================

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(filterActions.filter(e.target.value));
    };

    return (
        <div>
            <span>Filter </span>
            <input onChange={handleChange} name="anecdote" />
        </div>
    );
};

export default Filter;
