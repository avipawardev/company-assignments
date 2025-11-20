import React from 'react';

export default function MetricsCard({ metrics }) {
  return (
    <div className="metrics">
      <div className="metric">
        <h4>Total</h4>
        <p>{metrics.total || 0}</p>
      </div>
      <div className="metric">
        <h4>Pending</h4>
        <p>{metrics.pending || 0}</p>
      </div>
      <div className="metric">
        <h4>Reviewed</h4>
        <p>{metrics.reviewed || 0}</p>
      </div>
      <div className="metric">
        <h4>Hired</h4>
        <p>{metrics.hired || 0}</p>
      </div>
    </div>
  );
}
