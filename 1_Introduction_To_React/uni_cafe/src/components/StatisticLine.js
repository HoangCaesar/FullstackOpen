
const StatisticLine = ({ text, quantity }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{quantity}</td>
    </tr>
  )
}

export default StatisticLine