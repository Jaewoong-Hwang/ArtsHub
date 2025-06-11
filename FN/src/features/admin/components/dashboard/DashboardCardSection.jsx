const DashboardCardSection = ({ title, cards }) => (
    <>
        <h2>{title}</h2>
        <div className="dashboard-card-box">
            {cards.map(({ label, value }, idx) => (
                <div className="dashboard-card" key={idx}>
                    <h3>{label}</h3>
                    <p>{value}</p>
                </div>
            ))}
        </div>
    </>
);

export default DashboardCardSection;