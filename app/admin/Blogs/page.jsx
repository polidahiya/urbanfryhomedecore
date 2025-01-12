"use client";

import React, { useState, useRef } from "react";

const BlogWriter = () => {
  const [title, setTitle] = useState("");
  const editorRef = useRef(null); // Reference to the contentEditable div

  const handleFormatting = (command, value = null) => {
    document.execCommand(command, false, value); // Apply formatting
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageHTML = `<img src="${reader.result}" alt="Uploaded Image" class="my-2 max-w-full h-auto"/>`;
        insertHTMLAtCaret(imageHTML);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertHTMLAtCaret = (html) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const fragment = range.createContextualFragment(html);
      range.deleteContents();
      range.insertNode(fragment);
      range.collapse(false); // Move the caret after the inserted node
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorRef.current.innerHTML; // Get the HTML content
    alert("Blog submitted!");
    console.log({ title, content });
    setTitle("");
    editorRef.current.innerHTML = "<p>Start writing your blog...</p>";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Create a New Blog
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Blog Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter the blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleFormatting("bold")}
          >
            Bold
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleFormatting("italic")}
          >
            Italic
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleFormatting("underline")}
          >
            Underline
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleFormatting("createLink", prompt("Enter URL:"))}
          >
            Add Link
          </button>
          <label className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Blog Content */}
        <div
          className="border border-gray-300 rounded-lg p-4 mb-4 min-h-[200px] bg-white"
          contentEditable
          ref={editorRef}
          onInput={() => {}} // Allow editing without interference
          dangerouslySetInnerHTML={{ __html: "<p>Start writing your blog...</p>" }}
        ></div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogWriter;
