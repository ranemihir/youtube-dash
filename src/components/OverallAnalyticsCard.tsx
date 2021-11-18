import { OverallAnalytics } from "../types";

export const OverallAnalyticsCard = (props: { overallAnalytics: OverallAnalytics; }) => {
    const { name, value } = props.overallAnalytics;

    return (
        <div className="card rounded-0 shadow-sm">
            <div className="card-body">
                <h6 className="card-subtitle text-muted text-uppercase mb-1 text-truncate">{name}</h6>
                <h3 className="card-title mb-0  text-truncate">{value}</h3>
            </div>
        </div>
    );
};