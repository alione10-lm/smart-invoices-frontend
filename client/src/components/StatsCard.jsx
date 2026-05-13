import '../styles/dashboard.css';

export default function StatsCard({ icon, title, value }) {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">{icon}</div>
      <h2 className="stats-card-title">{title}</h2>
      <p className="stats-card-value">{value}</p>
    </div>
  );
}
