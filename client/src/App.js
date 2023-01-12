import React, { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(url);
    setUrl("");
  };
  return (
    <div className="home">
      <form className="home__form">
        <h2>Website Aggregator</h2>
        <label htmlFor="url">Provide the website URL</label>
        <input
          type="url"
          name="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>ADD WEBSITE</button>
      </form>
    </div>
  );
};

export default App;
