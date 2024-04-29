import React, { useEffect, useState } from "react";
import { Story } from "./Story.jsx";
import { useOutletContext } from "react-router-dom";

const getStories = async (apiKey) => {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", apiKey);

  try {
    const response = await fetch(
      'https://api.goperigon.com/v1/stories/all?q="electric%20vehicles"&expandArticles=true',
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    const jsonData = await response.json();
    return jsonData.results;
  } catch (error) {
    console.error(error);
  }
};

export function Stories() {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  const { apiKey } = useOutletContext();

  const fetchStories = async () => {
    setError(null);
    const stories = await getStories(apiKey);
    if (!stories) {
      setError(
        "Error fetching stories, please make sure your API key is valid!"
      );
      return;
    }
    setStories(stories);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  if ((!stories || stories.length === 0) && !error)
    return <p className="text-center text-base col-span-8">Loading...</p>;

  return (
    <div className="grid grid-cols-12 w-full gap-x-4 gap-y-6 p-6 lg:p-10">
      {error && (
        <p className="text-red-500 font-semibold text-base col-span-8">
          {error}
        </p>
      )}
      {!error &&
        stories.length > 0 &&
        stories.map((story) => <Story story={story} />)}
    </div>
  );
}
