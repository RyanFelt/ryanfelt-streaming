import React from 'react';
import { Link } from 'react-router-dom';
import 'App.css';

export const Admin = () => {
  return (
    <div className="form-flex-container mt-5">
      <Link to="admin/new-title">Add New Title</Link>
      <Link to="admin/new-episodes">Add New Episodes</Link>
    </div>
  );
};
