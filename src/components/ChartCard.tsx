import { CategoryScale, Chart, ChartItem, LinearScale, LineController, LineElement, PointElement, ScatterController } from 'chart.js';
import { useEffect } from 'react';
import { DataPoint } from '../types';

const color = "#ff0000";

function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const ChartCard = (props: { dataPoint: DataPoint; }) => {
    const { name, data } = props.dataPoint;


    useEffect(() => {
        const ctx = document.getElementById(name) as ChartItem;

        Chart.register(LineController, ScatterController, CategoryScale, LinearScale, PointElement, LineElement);

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((v: number, i: number) => i),
                datasets: [{
                    pointRadius: 3,
                    pointBackgroundColor: hexToRGB(color, 1),
                    borderColor: hexToRGB(color, 0.4),
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