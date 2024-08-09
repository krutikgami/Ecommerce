import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'

const Requests = () => {
  const [cart, setCarts] = useState([]);
  const {currentUser} = useSelector(state=>state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/users/fetch-card', {
          method: 'POST',
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          
          const filteredOrders = data.data.filter(order => order.username === currentUser.data.user.username);
          setCarts(filteredOrders);
          console.log(cart);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  
  

  const handleDelete = async(id) => {
    try {
      const res = await fetch(`/api/v1/admin/delete-card/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCarts(cart.filter(carts => carts._id !== id)); 
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="bg-[#141428] text-white p-4 mb-4 flex justify-between items-center rounded">
        <h2 className="text-lg">Responsive table</h2>
        <button className="bg-white text-blue-500 py-1 px-2 rounded">Dismiss</button>
      </div>
      <table className="w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border-b text-center w-1/6">Images</th>
            <th className="p-4 border-b text-center">Category</th>
            <th className="p-4 border-b text-center">SubCategory</th>
            <th className="p-4 border-b text-center">Title</th>
            <th className="p-4 border-b text-center">Price</th>
            <th className="p-4 border-b text-center">Sizes</th>
            <th className="p-4 border-b text-center">Uploaded</th>
            <th className="p-4 border-b text-center">Quantity</th>
            <th className="p-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((client, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-4 border-b">
                <div className='w-full sm:w-1/5 md:w-2/5 lg:w-1/5'>
                  <img src={client.imageurl.url} alt={client.title} className="object-cover w-full" />
                </div>
              </td>
              <td className="p-4 border-b">{client.category}</td>
              <td className="p-4 border-b">{client.subcategory}</td>
              <td className="p-4 border-b">{client.title}</td>
              <td className="p-4 border-b">{client.price}</td>
              <td className="p-4 border-b">
                {Array.isArray(client.sizes) ? client.sizes.map((size, index) => (
                  <span key={index} className="border border-gray-300 rounded px-2 py-1 m-1 inline-block">
                    {size}
                  </span>
                )) : <span className="text-gray-500">No sizes available</span>}
              </td>
              <td className="p-4 border-b">{client.createdAt.slice(0, 10)}</td>
              <td className="p-4 border-b">{client.quantity}</td>
              <td className="p-4 border-b">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => handleDelete(client._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
