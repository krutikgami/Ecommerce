import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, RemoveItem,TotalAmountHandle } from '../Redux/AddCartSlice.js';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalCount } = useSelector(state => state.cart);
  const { currentUser } = useSelector(state => state.user);
  const [cart, setCarts] = useState([]);
  const [messages, setMessages] = useState({});

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
    setMessages(prevMessages => ({ ...prevMessages, [id]: 'Quantity increased' }));
    clearMessage(id);
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
    setMessages(prevMessages => ({ ...prevMessages, [id]: 'Quantity decreased' }));
    clearMessage(id);
  };

  const handleRemove = (id) => {
    dispatch(RemoveItem({ id }));
    setMessages(prevMessages => ({ ...prevMessages, [id]: 'Item removed from cart' }));
    clearMessage(id);
  };

  const clearMessage = (id) => {
    setTimeout(() => {
      setMessages(prevMessages => ({ ...prevMessages, [id]: '' }));
    }, 2000);
  };

  useEffect(() => {

if(items === null || items.length === 0){
  dispatch(TotalAmountHandle());
}

    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/users/fetch-card', {
          method: 'POST',
        });
        if (res.ok) {
          const data = await res.json();
          setCarts(data.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  // console.log(cart);
  

  const handlePlaceOrder = async (item) => {
  //  console.log(cart.find(cartItem => cartItem._id === item._id)?.username);
    
    try {
      const response = await fetch('/api/v1/users/order', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          Vendorusername: `${cart.find(cartItem => cartItem._id === item._id)?.username}` ,
          userEmail: currentUser.data.user.email,
          items: [{
            productId: item._id,
            category: item.category,
            subcategory: item.subcategory,
            title: item.title,
            quantity: item.userQuantity,
            totalAmount: item.userAmont,
            imageurl:item.imageurl.url
          }]
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessages(prevMessages => ({ ...prevMessages, [item._id]: 'Order placed successfully' }));
      } else {
        setMessages(prevMessages => ({ ...prevMessages, [item._id]: 'Error placing order' }));
      }
      clearMessage(item._id);
    } catch (error) {
      setMessages(prevMessages => ({ ...prevMessages, [item._id]: 'Error placing order' }));
      clearMessage(item._id);
    }
  };

  const uniqueItemsMap = new Map();
  items.forEach(item => {
    if (!uniqueItemsMap.has(item._id)) {
      uniqueItemsMap.set(item._id, item);
    }
  });

  const uniqueItems = Array.from(uniqueItemsMap.values());

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg">
          {uniqueItems.length === 0 ? (
            <div>No items in the cart.</div>
          ) : (
            uniqueItems.map((item, index) => (
              <div key={item._id} className="product bg-white mb-4 p-4 rounded-lg shadow-lg">
                <div className="text-lg font-semibold">From Saved Addresses</div>
                <div className="flex flex-col sm:flex-row mt-4">
                  <div className="w-24 sm:h-40 h-40 relative items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={item.imageurl.url}
                      alt="Product"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-0 sm:ml-5 mt-4 sm:mt-0 flex-1">
                    <div className="text-xl font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-500">Cherry Blossom Strap, Free Size</div>
                    <div className="text-sm text-gray-500">Seller: RetailNet</div>
                    <div className="flex items-center mt-2 ml-24">
                      <span className="line-through text-gray-500">₹7,990</span>
                      <span className="text-green-600 text-xl ml-2">₹{item.userAmont}</span>
                      <span className="text-green-600 ml-2">83% Off</span>
                    </div>
                    <div className="text-green-600 text-sm">2 offers applied</div>
                    <div className="text-sm mt-2">Delivery by Wed Jul 31 | Free</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="bg-gray-300 text-black py-1 px-2 rounded-lg"
                    >
                      -
                    </button>
                    <span className="count mx-2">{item.userQuantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="bg-gray-300 text-black py-1 px-2 rounded-lg"
                    >
                      +
                    </button>
                    <button className="ml-4 text-blue-500">SAVE FOR LATER</button>
                    <button className="ml-4 text-red-500" onClick={() => handleRemove(item._id)}>REMOVE</button>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    {cart.find(cartItem => cartItem._id === item._id)?.quantity === 0 ? (
                      <button className="bg-gray-500 text-white py-1 px-4 rounded-lg" disabled>
                        Item Sold Out
                      </button>
                    ) : (
                      <button onClick={() => handlePlaceOrder(item)} className="bg-blue-500 text-white py-1 px-4 rounded-lg">
                        Proceed
                      </button>
                    )}
                    {cart.find(cartItem => cartItem._id === item._id)?.quantity > 0 && cart.find(cartItem => cartItem._id === item._id)?.quantity < 5 && (
                      <div className="text-red-600 mt-2">
                        Only {cart.find(cartItem => cartItem._id === item._id)?.quantity} left in stock!
                      </div>
                    )}
                  </div>
                </div>
                {messages[item._id] && <div className="text-center text-green-600 mt-4">{messages[item._id]}</div>}
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-1/3 ml-0 md:ml-4 mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-lg sticky top-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="text-lg font-semibold">PRICE DETAILS</div>
          <div className="mt-2 text-sm">
            <div className="flex flex-wrap justify-between">
              <div>Price ({totalCount} items)</div>
              <div>₹{items === null ? 0 : totalAmount}</div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div>Discount</div>
              <div className="text-green-600">- ₹{items === null ? 0 : totalAmount}</div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div>Delivery Charges</div>
              <div className="text-green-600">Free</div>
            </div>
            <div className="flex flex-wrap justify-between font-semibold mt-2">
              <div>Total Amount</div>
              <div>₹{items === null ? 0 : totalAmount}</div>
            </div>
            <div className="text-green-600 mt-2">You will save ₹{items === null ? 0 : totalAmount} on this order</div>
          </div>
          <div className="text-sm text-gray-500 mt-4">
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
