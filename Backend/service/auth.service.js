import axios from 'axios';
import querystring from 'querystring';

export const getAuthUrl = (state) => {
  const params = {
    client_id: process.env.BB_CLIENT_ID,
    redirect_uri: process.env.BB_REDIRECT_URI,
    response_type: 'code',
    state: state || 'default_state'
  };
  return `${process.env.BB_AUTH_URL}?${querystring.stringify(params)}`;
};

export const exchangeCodeForToken = async (code) => {
  const authString = Buffer.from(`${process.env.BB_CLIENT_ID}:${process.env.BB_CLIENT_SECRET}`).toString('base64');
  
  const response = await axios.post(
    process.env.BB_TOKEN_URL,
    querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.BB_REDIRECT_URI
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      }
    }
  );
  
  return {
    accessToken: response.data.access_token,
    expiresIn: response.data.expires_in,
    patientId: response.data.patient
  };
};