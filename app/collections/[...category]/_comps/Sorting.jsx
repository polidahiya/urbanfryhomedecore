"use client";
import React, { useState } from "react";

const SortSelector = ({ onSortChange,numberofproduct }) => {
  const [selectedSort, setSelectedSort] = useState("popularity");

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm">
        Sort By:
      </label>
      <select
        id="sort"
        value={selectedSort}
        onChange={handleSortChange}
        className="p-2 text-sm border-none outline-none cursor-pointer"
      >
        <option value="popularity">Popularity</option>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
        <option value="newest">Newest First</option>
        <option value="rating">Customer Rating</option>
      </select>
      <span className="text-theme">
        {numberofproduct} Items
      </span>
    </div>
  );
};

export default SortSelector;
