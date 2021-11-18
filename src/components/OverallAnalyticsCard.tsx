export const OverallAnalyticsCard = (props: { name: string, value: string; }) => {
    const { name, value } = props;

    return (
        <div className="card border-0 shadow">
            <div className="card-body">
                <h6 className="card-subtitle text-muted text-uppercase mb-1">{name}</h6>
                <h2 className="card-title">{value}</h2>
            </div>
        </div>
    );
};