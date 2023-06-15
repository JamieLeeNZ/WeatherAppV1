import React from 'react';
import { useState } from 'react';
import DisplayDetails from '../components/DisplayDetails';

function GetInput({ location, handleInputChange, handleSubmit }) {
  return (
    <form className="m-5 font-serif font-family-Georgia" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleInputChange}
        className="w-40 md:w-60 bg-slate-700 text-white px-4 py-2 rounded-l-md hover:border-slate-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
      >
        Get Weather
      </button>
    </form>
  );
}

export default GetInput;