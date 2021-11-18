import { CategoryScale, Chart, ChartItem, LinearScale, LineElement, PointElement, ScatterController } from 'chart.js';
import { useEffect } from 'react';
import { DataPoint } from '../types';


export const ChartCard = (props: { dataPoint: DataPoint; }) => {
    const { name, data } = props.dataPoint;


    useEffect(() => {
        const ctx = document.getElementById(name) as ChartItem;

        Chart.register(ScatterController, CategoryScale, LinearScale, PointElement, LineElement);

        const chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: name,
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(0,0,255,1)",
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
        <div className="card rounded-0 shadow-sm">
            <div className='card-body text-center'>
                <h6 className='card-title pb-2'>{name + ' / Video'}</h6>
                <canvas id={name}></canvas>
            </div>
        </div>
    );
};