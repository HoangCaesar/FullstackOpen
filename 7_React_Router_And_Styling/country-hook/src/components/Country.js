// ==========================================|| COUNTRY API ||==========================================

const Country = ({ country }) => {
    if (!country) {
        return null;
    }

    if (!country.found) {
        return <h1 style={{ marginTop: '20px' }}>Not found! Please try again.</h1>;
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <img src={country.data.flags.png} height="120px" alt={country.data.flags.alt} />
            <h3>{country.data.name.common} </h3>
            <div style={{ marginTop: '10px' }}>
                Capital: <h4 style={{ display: 'inline-block' }}>{country.data.capital[0]}</h4>{' '}
            </div>
            <div style={{ marginTop: '10px' }}>Population: {country.data.population} people</div>
        </div>
    );
};

export default Country;
