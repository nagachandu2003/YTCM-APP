import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthCallback() {
  const [status, setStatus] = useState('Processing...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      completeUpload(code, state);
    } else {
      setStatus('Error: Missing authentication data');
    }
  }, [location]);

  const completeUpload = async (code, state) => {
    try {
      const response = await axios.get(`https://js-member-backend.vercel.app/oauth2callback`, {
        params: { code, state }
      });
      
      if (response.data.success) {
        setStatus(`Upload successful! Video ID: ${response.data.videoId}`);
        setTimeout(() => navigate('/success/' + response.data.videoId), 3000);
      } else {
        setStatus('Upload failed: ' + response.data.error);
      }
    } catch (error) {
      setStatus('Error completing upload: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Completing Upload</h2>
      <p>{status}</p>
    </div>
  );
}

export default AuthCallback;