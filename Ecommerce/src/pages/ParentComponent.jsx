import React, { useState } from "react";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";

const ParentComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {items} = useSelector(state => state.cart);
//   console.log(items);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {/* <Card items={items} searchQuery={searchQuery} /> */}
    </div>
  );
};

export default ParentComponent;
