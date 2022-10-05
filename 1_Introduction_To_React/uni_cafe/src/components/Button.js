
const Button = ({ text, onClick }) => <button style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => onClick(text)} >{text}</button>

export default Button