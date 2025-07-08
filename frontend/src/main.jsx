import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({isAuthorized : true});
const AppWrapper = () => {
  // Hardcode as authorized and provide a default user
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [user, setUser] = useState({
    name: "Demo User",
    email: "demo@example.com",
    role: "Employer", // or "Job Seeker"
    phone: "1234567890"
  });

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}>
      <App />
    </Context.Provider>
  );
};
  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)

