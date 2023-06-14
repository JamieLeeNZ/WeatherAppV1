import React from 'react';

function GetInput({ location, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleInputChange}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default GetInput;