import React from 'react';
import { useSelector } from 'react-redux';
import { FaBox, FaTags, FaUsers, FaBell } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Overview() {
  const { currentUser } = useSelector(state => state.user);

  const barData = {
    labels: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Games'],
    datasets: [
      {
        label: 'Count',
        data: [8, 6, 5, 3, 2],
        backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Purchase Orders',
        data: [20, 45, 28, 80, 99, 43],
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Sales Orders',
        data: [30, 35, 25, 70, 80, 60],
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return (
    <aside className="ml-[270px] p-4 bg-gray-900 min-h-screen text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">PRODUCTS</h3>
            <p className="text-3xl">249</p>
          </div>
          <FaBox className="text-4xl" />
        </div>
        <div className="bg-orange-500 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">CATEGORIES</h3>
            <p className="text-3xl">25</p>
          </div>
          <FaTags className="text-4xl" />
        </div>
        <div className="bg-green-600 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">CUSTOMERS</h3>
            <p className="text-3xl">1500</p>
          </div>
          <FaUsers className="text-4xl" />
        </div>
        <div className="bg-red-600 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">ALERTS</h3>
            <p className="text-3xl">56</p>
          </div>
          <FaBell className="text-4xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Top 5 Products</h2>
          <Bar data={barData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Purchase and Sales Orders</h2>
          <Line data={lineData} />
        </div>
      </div>
    </aside>
  );
}

export default Overview;
