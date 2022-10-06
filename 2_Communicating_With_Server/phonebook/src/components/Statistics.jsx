import Details from './Details';

const Statistics = ({ statistics }) => {
  return (
    <>
    {
      statistics.map((statistic => <Details key={statistic.name} name={statistic.name} number={statistic.number} />))
    }
     </>
  )
}

export default Statistics