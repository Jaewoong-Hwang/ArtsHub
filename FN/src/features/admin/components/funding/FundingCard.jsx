const FundingCard = ({ data }) => (
    <div className="funding">
        {data.map(({ label, value }) => (
            <div className={`funding-card ${label.includes("누적") ? "funding-total" : "funding-month"}`} key={label}>
                <h3>{label}</h3>
                <p>{value}</p>
            </div>
        ))}
    </div>
);

export default FundingCard;