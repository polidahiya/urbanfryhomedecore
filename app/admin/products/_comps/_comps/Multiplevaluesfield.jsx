import React from "react";

function Multiplevaluesfield({ title, placeholder, state, setState }) {
  const handleAdd = () => {
    setState([...state, ""]);
  };

  const handleDelete = (index) => {
    setState(state.filter((_, i) => i !== index));
  };

  const handleStateChange = (index, value) => {
    const updatedState = [...state];
    updatedState[index] = value;
    setState(updatedState);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{title}</label>
      <ul className="mt-2 space-y-1">
        {state.map((dimension, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={dimension}
              onChange={(e) => handleStateChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 p-2 border rounded-md outline-none"
            />
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => handleDelete(index)}
            >
              -
            </button>
          </div>
        ))}
      </ul>
      <button
        type="button"
        className="border border-gray-300 px-5 py-2 rounded-md text-sm mt-2"
        onClick={handleAdd}
      >
        + Add more
      </button>
    </div>
  );
}

export default Multiplevaluesfield;
