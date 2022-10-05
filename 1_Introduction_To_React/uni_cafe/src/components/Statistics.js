import { useState, useLayoutEffect } from 'react';
import StatisticLine from './StatisticLine'

const Statistics = ({ quantities, texts }) => {
    const [average, setAverage] = useState(0)
    const [positivePercent, setPositivePercent] = useState(0)
    let total = quantities[0] + quantities[1] + quantities[2];

    useLayoutEffect(() => {
        setAverage(
            total ? ((quantities[0] * 1 + quantities[1] * 0 + quantities[2] * -1) / total).toFixed(1) : 0
        )
        setPositivePercent(
            total ? ((quantities[0] / total) * 100).toFixed(1) : 0
        )
    }, [quantities[0], quantities[1], quantities[2], total, quantities])

    return (
        <table>
            <tbody>
                {texts.map(
                    (text, index) => <StatisticLine key={text} text={text} quantity={quantities[index]} />
                )}
                <tr>
                    <td>all</td>
                    <td>{total}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>percentage</td>
                    <td>{positivePercent}%</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Statistics;
