import React from 'react'
import { memo } from 'react'

const Details = ({ name, phone, id, handleDelete }) => {
  return (
    <p>
      {name} {phone}
      <button onClick={() => handleDelete(id, name)} style={{ marginLeft: '10px', cursor: 'pointer'}}>delete</button>
    </p>
  )
}

export default memo(Details)