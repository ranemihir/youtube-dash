import { Chart, ChartItem } from 'chart.js';
import { DataPoint } from '../types';

export const ChartCard = (props: { dataPoint: DataPoint; }) => {
    const { name, data } = props.dataPoint;

    const ctx = document.getElementById(name) as ChartItem;
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                data
            }]
        }
    });

    return (
        <div className="card">
            <div className='card-title'>{name}</div>
            <canvas id={name}></canvas>
        </div>
    );
};