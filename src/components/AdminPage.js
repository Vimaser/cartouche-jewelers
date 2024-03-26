import React from 'react';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        {/* Navigation Menu */}
        {/* Add links or buttons for navigation AS needed */}
      </nav>
      
      <AddProductForm />
      <br/>
      <ProductList />
    </div>
  );
};

export default AdminPage;
