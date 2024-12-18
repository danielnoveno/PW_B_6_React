import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProfile } from "../api/apiUser";
import { useAuth } from "../contexts/AuthContext";

import TopNavbar from "../components/TopNavbar";
import SideBarCollapse from "../components/AdminSideBarCollapse";

  

const AdminLayout = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);
        
        // Verify user and token exist before making the request
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        console.log('Token exists:', !!token);
        console.log('Stored user exists:', !!storedUser);

        if (!token || !storedUser) {
          throw new Error('No authentication token or user found');
        }

        const profile = await getAdminProfile();
        console.log('Profile fetch successful:', profile);
        
        setUserData(profile);
        setLoading(false);
      } catch (err) {
        console.error('Profile fetch error details:', err);

        // More granular error handling
        if (err.status === 401 || err.status === 403) {
          console.log('Unauthorized - logging out');
          logout();
          navigate('/');
        } else {
          setError(err.message || 'Failed to fetch profile');
          setLoading(false);
        }
      }
    };

    fetchAdminProfile();
  }, [logout, navigate]);
  
  return (
    <div className="d-flex min-vh-100 bg-white">
      <SideBarCollapse />
      <div className="flex-grow-1">
        <TopNavbar userData={userData} />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
