import { Link } from "react-router-dom";

export function Story({ story }) {
  const storyImageUrl = story.selectedArticles[0].imageUrl;

  return (
    <Link
      to={`/story/${story.id}`}
      className="col-span-4 lg:col-span-3 cursor-pointer h-full"
    >
      <div className="flex flex-col rounded-md bg-gray-200 pt-0 pb-8 overflow-hidden h-full">
        <span className="w-full">
          <img
            className="h-[13rem] w-full object-cover"
            src={storyImageUrl}
            alt={story.name}
          />
        </span>
        <h2 className="text-slate-800 text-xl font-semibold mt-2 flex-1 flex items-center justify-center">
          {story.name}
        </h2>
      </div>
    </Link>
  );
}
