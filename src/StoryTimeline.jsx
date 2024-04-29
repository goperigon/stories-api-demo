import { useState, useEffect, useMemo } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { getTimeSince, reorderArticlesByPubDate } from "./utils";
import { Link } from "react-router-dom";

const getStory = async (apiKey, clusterId) => {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", apiKey);

  try {
    const response = await fetch(
      `https://api.goperigon.com/v1/stories/all?expandArticles=true&clusterId=${clusterId}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    const jsonData = await response.json();
    return jsonData.results[0];
  } catch (error) {
    console.error(error);
  }
};

export function StoryTimeline() {
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);
  const { apiKey } = useOutletContext();

  const { storyId } = useParams();

  const fetchStory = async () => {
    setError(null);
    const story = await getStory(apiKey, storyId);
    if (!story) {
      setError("Error fetching story, please make sure your API key is valid!");
      return;
    }
    setStory(story);
  };

  useEffect(() => {
    fetchStory();
  }, []);

  const reOrderedArticles = useMemo(() => {
    if (!story) return [];
    return reorderArticlesByPubDate(story.selectedArticles);
  }, [story]);

  if (!story && !error)
    return <p className="text-center text-base col-span-8">Loading...</p>;

  if (!story && error)
    return (
      <p className="text-center text-red-500 font-semibold text-base col-span-8">
        {error}
      </p>
    );

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg flex flex-col items-center h-full w-full pt-10 pb-10">
        <Link to="/" className="text-sm text-blue-500 cursor-pointer">
          👈 Go Back
        </Link>
        <h2 className="text-2xl font-bold text-center">{story.name}</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-xl text-ellipsis line-clamp-3 text-center">
          {story.summary}
        </p>
        <div className="flex flex-col items-center mt-8 text-lg">
          <h3 className="font-semibold">Articles Timeline</h3>
          <div className="flex flex-col gap-y-4 items-center mt-4">
            {reOrderedArticles.map((article, idx) => (
              <>
                {
                  <div className="flex items-center justify-center h-full relative">
                    <div className="border-l-4 border-slate-300 border-dotted h-20"></div>
                  </div>
                }
                <span className="pl-2 text-gray-600 text-sm">
                  {getTimeSince(new Date(article.pubDate))}
                </span>
                <a href={article.url} target="_blank">
                  <div
                    key={article.articleId}
                    className="flex flex-col items-center max-w-xs m-2 bg-gray-200 py-4 px-3 rounded-lg mt-0"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-64 rounded-md"
                    />
                    <a className="text-blue-500 text-sm mt-1">
                      {article.source.domain}
                    </a>
                    <h4 className="text-sm max-w-[15rem] text-slate-800 text-center font-semibold">
                      {article.title}
                    </h4>
                    <div className="mt-3 flex flex-col items-center">
                      {/* <p className="text-slate-500 text-sm line-clamp-2 text-center">
                        {article.description}
                      </p> */}
                      <div className="mt-1">
                        <span className="text-slate-500 text-sm line-clamp-2 text-center">
                          Country: <b>{article.country}</b>
                        </span>
                        <span className="text-slate-500 text-sm line-clamp-2 text-center">
                          Author: <b>{article.matchedAuthors[0]?.name}</b>
                        </span>
                        <span className="text-slate-500 text-sm line-clamp-1 text-center">
                          Companies:{" "}
                          <b>
                            {article.companies.map((e) => e.name).join(", ")}
                          </b>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
