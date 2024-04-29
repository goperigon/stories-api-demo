import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function Root() {
  const [apiKey, setApiKey] = useState(null);
  const [debouncedApiKey] = useDebounce(apiKey, 300);

  const handleInputDebouncedChange = (event) => {
    setApiKey(event.target.value);
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center">
          <label className="font-semibold mt-4">
            Enter your API Key to get started
          </label>
          <input
            className="text-lg border border-gray-300 rounded px-2 py-1 mt-2 w-3/4"
            onChange={handleInputDebouncedChange}
            value={apiKey}
            placeholder="<YOUR_API_KEY>"
          />
        </div>
        {debouncedApiKey && <Outlet context={{ apiKey: apiKey }} />}
      </div>
    </>
  );
}
