import React, { useState } from 'react';
import api from '../api/api';

export default function CandidateCard({ candidate, onUpdated }) {
  const [status, setStatus] = useState(candidate.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (s) => {
    setLoading(true);
    try {
      const res = await api.put(`/candidates/edit-candidates/${candidate._id}`, { status: s });
      setStatus(res.data.status);
      onUpdated && onUpdated(res.data);
    } catch (err) {
      alert(err.response.data.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>{candidate.name}</h3>
      <p><strong>Job:</strong> {candidate.jobTitle}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Phone:</strong> {candidate.phone}</p>
      <p><strong>Status:</strong> {status}</p>
      {candidate.resumeUrl && (
        <a href={candidate.resumeUrl} target="_blank" rel="noreferrer">View Resume</a>
      )}
      <div style={{marginTop:10}}>
        <select value={status} onChange={(e)=>updateStatus(e.target.value)} disabled={loading}>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
    </div>
  );
}
