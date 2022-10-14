import { useEffect } from 'react'

const addStyle = {
    padding: '5px',
    fontSize: '24px',
    color: 'green',
    border: '3px solid green'
}

const removeStyle = {
    padding: '5px',
    fontSize: '24px',
    color: 'red',
    border: '3px solid red'
}

const Notification = ({ message, handleMessage }) => {
    const style = message.type === 'remove' ? removeStyle : addStyle;

    useEffect(() => {
        const id = window.setTimeout(handleMessage, 5000)

        return () => {
            window.clearTimeout(id)
        }
    }, [])

    return (
        <>
            <p style={style}>{message.msg}</p>
        </>
    )
}

export default Notification