import Details from './Details';
import { memo } from 'react'

const Statistics = ({ statistics, handleDelete }) => {
  return (
    <>
      {
        statistics.map((statistic =>
          <Details
            key={statistic.name}
            name={statistic.name}
            number={statistic.number}
            id={statistic.id}
            handleDelete={handleDelete}
          />))
      }
    </>
  )
}

export default memo(Statistics)