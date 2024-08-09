import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const subcategories = {
  Electronics: ['Mobile Phones', 'Laptops', 'Cameras', 'Televisions', 'Audio', 'Accessories'],
  Fashion: ['Men', 'Women', 'Kids', 'Footwear', 'Accessories', 'Jewelry'],
  'Home & Garden': ['Furniture', 'Kitchen', 'Decor', 'Gardening', 'Bedding', 'Tools'],
  'Health & Beauty': ['Skincare', 'Makeup', 'Haircare', 'Personal Care', 'Fragrances', 'Health Devices'],
  'Sports & Outdoors': ['Fitness', 'Cycling', 'Camping', 'Team Sports', 'Water Sports', 'Accessories'],
  'Toys & Games': ['Action Figures', 'Board Games', 'Puzzles', 'Educational Toys', 'Outdoor Play', 'Dolls'],
  'Grocery':['Biscuits', 'Chips & Snacks' ,'Tea','Coffee','Noodles & Pasta','Chocolates & Sweets'],
  'Appilances':['Television', 'Washing Machine','Air Conditioners','Refrigerators', 'Food & Drinks'],
  'Sports & Fitness':['Gym Equipment', 'Sports Wear']
  
};

const Vendor = () => {
  const {currentUser} = useSelector(state=>state.user)
  
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username:`${currentUser.data.user.username}`,
    category: '',
    subcategory: '',
    title: '',
    price: '',
    quantity: '',
    image: null,
  });
  const [errormessage, setErrormessage] = useState('');
  
  
  const handleSizeAdd = () => {
    if (sizeInput) {
      setSizes([...sizes, sizeInput]);
      setSizeInput('');
    }
  };

  const handleSizeRemove = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('sizes', JSON.stringify(sizes)); 

      const res = await fetch('/api/v1/users/add-cart', {
        method: 'POST',
        body: formDataToSend,
      });

      if (res.ok) {
        const data = await res.json();
        setLoading(true);
        fetchCart();
        console.log("Product Added Successfully");
       
      } else {
        const errorData = await res.json();
        setErrormessage(errorData.message || 'Upload failed');
      }
    } catch (error) {
      setErrormessage(error.message);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/v1/users/fetch-card', {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        // setPdfs(data);
      } else {
        console.error('Failed to fetch PDFs');
      }
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  useEffect(() => {
    if (formData.category) {
      setFormData({ ...formData, subcategory: '' });
    }
  }, [formData.category]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 text-sm font-bold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(subcategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {formData.category && (
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 text-sm font-bold">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories[formData.category].map((subcategory) => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 text-sm font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 text-sm font-bold">Sizes</label>
          <div className="w-2/3 flex items-center">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mr-2"
            />
            <button
              type="button"
              onClick={handleSizeAdd}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mb-2 flex flex-wrap">
          {sizes.map((size, index) => (
            <span key={index} className="inline-block bg-gray-200 p-2 rounded-lg mr-2 mb-2 flex items-center">
              {size}
              <button
                type="button"
                onClick={() => handleSizeRemove(index)}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 text-sm font-bold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 text-sm font-bold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 text-sm font-bold">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="w-2/3 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        {errormessage && (
          <div className="mb-4 text-red-500">
            {errormessage}
          </div>
        )}
        
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Vendor
