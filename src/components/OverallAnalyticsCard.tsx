import { OverallAnalytics } from "../types";

export const OverallAnalyticsCard = (props: { overallAnalytics: OverallAnalytics; }) => {
    const { name, value } = props.overallAnalytics;

    return (
        <div className="card border-0 shadow">
            <div className="card-body">
                <h6 className="card-subtitle text-muted text-uppercase mb-1">{name}</h6>
                <h2 className="card-title">{value}</h2>
            </div>
        </div>
    );
};