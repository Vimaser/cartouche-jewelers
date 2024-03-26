import React from 'react';
import AddProductForm from './AddProductForm'; // Assume this is a component for adding products
import ProductList from './ProductList'; // Assume this is a component for listing and managing products

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        {/* Navigation Menu */}
        {/* Add links or buttons for navigation if needed */}
      </nav>
      
      <AddProductForm />
      <br/>
      <ProductList />
    </div>
  );
};

export default AdminPage;
