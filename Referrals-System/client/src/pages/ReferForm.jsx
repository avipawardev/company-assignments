import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function ReferForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await api.post('/candidates/create', {name,email,phone,jobTitle,resume});
      navigate('/');
    } catch (error) {
      setErr(error.response.data.message || 'Submit failed');
    }
  };

  return (
    <div className="container">
      <h2>Refer Candidate</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required />
        <input placeholder="Job Title" value={jobTitle} onChange={e=>setJobTitle(e.target.value)} required />
        <input type="file" accept=".pdf" onChange={e => setResume(e.target.files[0])} />
        <button type="submit">Refer</button>
      </form>
      {err && <p className="error">{err}</p>}
    </div>
  );
}



