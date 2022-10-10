import { useState, useEffect } from 'react';
import axios from 'axios';
import Detail from './Detail';

const Search = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [search, setSearch] = useState('');

    const [show, setShow] = useState(new Array(filterList.length));
    const [close, setClose] = useState(new Array(filterList.length));

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(res => {
                if (res) setCountriesList(res.data);
                else throw new Error('Response is not available');
            })
    }, [])

    useEffect(() => {
        const filterList = countriesList.filter(
            country =>
                country.name.common.toLowerCase().includes(search.toLowerCase())
                ||
                country.name.official.toLowerCase().includes(search.toLowerCase())
        )
        setFilterList(filterList)
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleShow = (index) => {
        console.log(index);
        setShow(prev => {
            const arr = []
            for (let i = 0; i < filterList.length; i++) {
                if (i == index) arr[i] = filterList[i]
                else arr[i] = prev[i];
            }
            return arr;
        }
        );
        setClose(prev => {
            const arr = []
            for (let i = 0; i < filterList.length; i++) {
                if (i == index) arr[i] = true
                else arr[i] = prev[i];
            }
            return arr;
        });
    }

    const handleClose = (index) => {
        setShow(prev => {
            const arr = []
            for (let i = 0; i < filterList.length; i++) {
                if (i == index) arr[i] = undefined
                else arr[i] = prev[i];
            }
            return arr;
        }
        );
        setClose(prev => {
            const arr = []
            for (let i = 0; i < filterList.length; i++) {
                if (i == index) arr[i] = false
                else arr[i] = prev[i];
            }
            return arr;
        });
    }

    console.log(show);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: '10px' }}>Find countries</p>
                <input type="text" value={search} onChange={handleSearch} />
            </div>

            {filterList.length > 10 && search && <p>Too many matches</p>}

            {filterList.length <= 10 && filterList.length > 1 && filterList.map(
                (country, index) =>
                    <div key={country.idd.suffixes}>
                        {country.name.common}
                        {
                            close[index] ?
                                <button onClick={() => handleClose(index)} style={{ cursor: 'pointer', marginLeft: '10px' }} >
                                    close
                                </button>
                                :
                                <button onClick={() => handleShow(index)} style={{ cursor: 'pointer', marginLeft: '10px' }} >
                                    show
                                </button>
                        }
                        {
                            show[index] && <Detail filterItem={show[index]} />
                        }
                    </div>
            )}

            {
                filterList.length == 1 && <Detail filterItem={filterList[0]} />
            }
        </>
    )
}

export default Search