
const Detail = ({ filterItem }) => {
    return (
        <>
            <h1>{filterItem.name.common}</h1>
            <h2><span>Capital: </span>{filterItem.capital}</h2>
            <h3><span>Area: </span>{filterItem.area}</h3>
            <h4>Languages: </h4>
            {
                Object.values(filterItem.languages).map(
                    (lan, i) => <li key={`${lan}`}>{lan}</li>
                )
            }
            <img src={filterItem.flags['png']} alt="Flags" style={{ marginTop: '30px' }} />
        </>
    )
}

export default Detail