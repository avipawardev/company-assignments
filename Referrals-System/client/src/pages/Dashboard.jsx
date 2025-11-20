import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CandidateCard from '../components/CandidateCard';
import MetricsCard from '../components/MetricsCard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState('');
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await api.get('/candidates/get-candidates');
      setCandidates(res.data);
    } catch (err) {
      alert('Failed to fetch candidates');
    } finally { setLoading(false); }
  };

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/candidates/metrics');
      setMetrics(res.data);
    } catch (err) {
      console.log('metrics err', err);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchMetrics();
  }, []);

  const filtered = candidates.filter(ele =>
    ele.jobTitle.toLowerCase().includes(filter.toLowerCase()) ||
    ele.status.toLowerCase().includes(filter.toLowerCase())
  );

  const handleUpdated = (updated) => {
    setCandidates(prev => prev.map(ele => ele._id === updated._id ? updated : ele));
    fetchMetrics();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Dashboard</h2>
        <div>
          <button onClick={()=>navigate('/refer')}>Refer Candidate</button>
          <button onClick={logout} style={{marginLeft:8}}>Logout</button>
        </div>
      </header>

      <MetricsCard metrics={metrics} />

      <div style={{margin:'12px 0'}}>
        <input placeholder="Search by job title or status" value={filter} onChange={e=>setFilter(e.target.value)} />
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="grid">
          {filtered.map(ele => <CandidateCard key={ele._id} candidate={ele} onUpdated={handleUpdated} />)}
        </div>
      )}
    </div>
  );
}
