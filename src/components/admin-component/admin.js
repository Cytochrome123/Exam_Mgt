import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminDashboard from './admin-dashboard';


const Admin = () => {
    return (
        <div>
                <Routes>
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                </Routes>
        </div>
    )
}

export default Admin;