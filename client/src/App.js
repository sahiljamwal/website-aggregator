import React, { useState } from "react";
import Loading from "./components/loading.component";

const App = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [websiteContent, setWebsiteContent] = useState([]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(url);
    setUrl("");
    //👇🏻 Calls the function.
    sendURL();
  };

  //👇🏻 remove the quotation marks around the description
  const trimDescription = (content) =>
    content.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");

  const sendURL = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/url", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response.json();

      if (data?.message) {
        setLoading(false);
        setWebsiteContent(data.database);
      }
    } catch (err) {
      console.error(err);
    }
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
      <main className="website__container">
        {websiteContent.map((content) => (
          <div className="website__item" key={content.id}>
            <img src={content?.brandImage} alt={content?.brandName} />
            <h3>{content?.brandName}</h3>
            <p>{trimDescription(content?.brandDescription)}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
