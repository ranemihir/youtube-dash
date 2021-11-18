import { CategoryScale, Chart, ChartItem, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import { useEffect } from 'react';
import { DataPoint } from '../types';

export const ChartCard = (props: { dataPoint: DataPoint; }) => {
    const { name, data } = props.dataPoint;


    useEffect(() => {
        const ctx = document.getElementById(name) as ChartItem;

        Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data, 
                    
                }]
            }
        });

        return () => {
            chart.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="card">
            <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <canvas id={name}></canvas>
            </div>
        </div>
    );
};