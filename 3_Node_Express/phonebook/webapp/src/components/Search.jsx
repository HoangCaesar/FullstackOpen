import { useState, useEffect, memo } from 'react'

const Search = ({ statistics, handleFilter }) => {
  const [search, setSearch] = useState('')

  const nameList = statistics.reduce((acc, statistic) => [...acc, statistic.name.toLowerCase()] , [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    let list = nameList.filter(nameItem => nameItem.includes(search.toLowerCase()))
    if(list.length > 0) handleFilter(list)
  }, [search])
  
  return (
    <>
      <label style={{ marginRight: '10px'}}>Filter show with</label>
      <input type="text" value={search} onChange={handleChange} />
    </>
  )
}

export default memo(Search)