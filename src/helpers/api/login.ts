import api from '.';

const apiLogin = (authToken: string): Promise<any> => {
  return api.post('/login', {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};

export default apiLogin;
