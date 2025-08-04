"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const SortSelector = ({ sort, numberofproduct }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSort, setSelectedSort] = useState(sort);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
    router.replace(`${pathname}?sort=${value}`, {
      scroll: false,
    });
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
        className="p-2 text-sm border-none outline-none cursor-pointer bg-white"
      >
        <option value={0}>Default</option>
        <option value={1}>Newest First</option>
        <option value={2}>Oldest First</option>
        <option value={3}>Price: Low to High</option>
        <option value={4}>Price: High to Low</option>
        <option value={5}>Lightest</option>
        <option value={6}>Heaviest</option>
      </select>
      <span className="text-theme">{numberofproduct} Items</span>
    </div>
  );
};

export default SortSelector;
