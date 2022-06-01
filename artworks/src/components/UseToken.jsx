import { useState } from 'react'

function UseToken() {
  const getToken = _ => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }
  
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }

  const removeToken = _ => sessionStorage.removeItem('token');

  return {
    setToken: saveToken,
    token,
    removeToken
  }
}

export default UseToken