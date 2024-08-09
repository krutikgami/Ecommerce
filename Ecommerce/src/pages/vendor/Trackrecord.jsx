import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Trackrecord = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProduct = async () => {
      try {
        const res = await fetch('/api/v1/users/fetchOrder', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          
          const filteredOrders = data.data.filter(order => order.Vendorusername === currentUser.data.user.username);
          setOrders(filteredOrders);
        } else {
          const errorData = await res.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProduct();
  }, []);
  console.log(orders);
  

  return (
    <div className="w-full h-full p-4">
      <div className="bg-blue-500 text-white p-4 mb-4 flex justify-between items-center rounded">
        <h2 className="text-lg">Responsive table</h2>
        <button className="bg-white text-blue-500 py-1 px-2 rounded">Dismiss</button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
           
            <th className="p-4 border-b text-left">Image</th>
            <th className="p-4 border-b text-left">Email</th>
            <th className="p-4 border-b text-left">Category</th>
            <th className="p-4 border-b text-left">Subcategory</th>
            <th className="p-4 border-b text-left">Title</th>
            <th className="p-4 border-b text-left">TotalPrice</th>
            <th className="p-4 border-b text-left">Sizes</th>
            <th className="p-4 border-b text-left">Date</th>
            <th className="p-4 border-b text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            order.items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                
                <td className="p-4 border-b">
                  <img src={item.imageurl} alt={item.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="p-4 border-b">{order.userEmail}</td>
                <td className="p-4 border-b">{item.category}</td>
                <td className="p-4 border-b">{item.subcategory}</td>
                <td className="p-4 border-b">{item.title}</td>
                <td className="p-4 border-b">{item.totalAmount}</td>
                <td className="p-4 border-b">
                {Array.isArray(item.sizes) ? item.sizes.map((size, index) => (
                  <span key={index} className="border border-gray-300 rounded px-2 py-1 m-1 inline-block">
                    {size}
                  </span>
                )) : <span className="text-gray-500">No sizes available</span>}
              </td>
                <td className="p-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 border-b">{item.quantity}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trackrecord;
