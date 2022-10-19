import React from 'react'
import { memo } from 'react'

const Details = ({ name, number, id, handleDelete }) => {
  return (
    <p>
      {name} {number}
      <button onClick={() => handleDelete(id, name)} style={{ marginLeft: '10px', cursor: 'pointer'}}>delete</button>
    </p>
  )
}

export default memo(Details)