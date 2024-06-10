import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Forms, Reports, Customer_Master, SignUp, Login, OTP,Items} from './components';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HashRouter>
      <Routes>
        {/* Route for login page */}
        <Route path="" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
          {/* Public routes */}
          <Route path="/signup" element={<SignUp />} />
        <Route path="/otp/:id" element={<OTP setIsAuthenticated={setIsAuthenticated} />} />
       
        {/* Conditional rendering of private routes */}
        {isAuthenticated ? (
          <>
           <Route path="/forms" element={<Forms />} />
            <Route path="/forms/:id" element={<Forms />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customers" element={<Customer_Master />} />
            <Route path="/items" element={<Items />} />
          </>
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/login" />} // Redirect to login if not authenticated
          />
        )}

      
      </Routes>
    </HashRouter>
  );
}

export default App;
