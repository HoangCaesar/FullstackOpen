import { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [search, setSearch] = useState('');

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
        console.log(filterList);
        setFilterList(filterList)
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: '10px' }}>Find countries</p>
                <input type="text" value={search} onChange={handleSearch} />
            </div>

            {filterList.length > 10 && search && <p>Too many matches</p>}

            {filterList.length <= 10 && filterList.length > 1 && filterList.map(
                country => <p key={country.idd.suffixes}>{country.name.common}</p>
            )}

            {
                filterList.length == 1 && <div>
                    <h1>{filterList[0].name.common}</h1>
                    <h2><span>Capital: </span>{filterList[0].capital[0]}</h2>
                    <h3><span>Area: </span>{filterList[0].area}</h3>
                    <h4>Languages: </h4>
                    {
                        Object.values(filterList[0].languages).map(
                            (lan, i) => <li key={`${lan}${i}`}>{lan}</li>
                        )
                    }
                    <img src={filterList[0].flags['png']} alt="Flags" style={{ marginTop: '30px' }} />
                </div>
            }
        </>
    )
}

export default Search