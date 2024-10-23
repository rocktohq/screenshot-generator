import { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [screenshot, setScreenshot] = useState(false);
  const [loading, setLoading] = useState(false);

  const getScreenhhot = async (url) => {
    if (!url) {
      return alert("Please provide a valid URL");
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/screenshot?url=${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setScreenshot(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 py-4 md:py-8 lg:py-16 xl:py-20 h-screen">
      <div className="w-full h-full">
        <div
          className={`space-x-4 flex justify-center ${
            screenshot ? "" : "items-center"
          }`}
        >
          <input
            className="px-4 py-2 border border-gray-500"
            placeholder="Enter URL to screenshot"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
          />
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 border border-transparent"
            onClick={() => getScreenhhot(url)}
          >
            Take Screenshot
          </button>
        </div>
        <div className="text-center py-5">
          {loading && (
            <span className="animate-pulse text-center text-md font-medium py-5">
              Processing...
            </span>
          )}
          {screenshot && (
            <img className="w-full py-5" src={screenshot} alt="Screenshot" />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
