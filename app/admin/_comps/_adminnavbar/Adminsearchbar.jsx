"use client";

const Adminsearchbar = ({ search, setsearch, onsubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onsubmit();
      }}
      className="flex gap-2 border h-10 rounded-md overflow-hidden"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="w-full px-5 outline-none"
        placeholder="Search"
      />
      <button className="px-5 h-full bg-theme text-white" type="submit">
        Search
      </button>
    </form>
  );
};

export default Adminsearchbar;
