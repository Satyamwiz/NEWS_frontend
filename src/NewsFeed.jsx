import { motion } from "framer-motion";

const NewsFeed = ({ filteredNews }) => {
  return (
    <div className="flex justify-center bg-primary min-h-screen text-primary-text font-body">
      {/* Main Container */}
      <div className="w-full max-w-[600px] bg-primary-light shadow-lg border-x border-gray-600 min-h-screen p-6">
        {/* News Items */}
        <div className="flex flex-col divide-y divide-gray-700">
          {filteredNews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 hover:bg-gray-800 transition duration-300 rounded-lg"
            >
              <h2 className="text-lg font-semibold text-white mb-2 font-display">
                {typeof item.news === "object"
                  ? item.news?.news?.split("\n\n")[0].replace(/^\*\*Headline:\s*|\*\*$/g, '') || "No Headline"
                  : item.news?.split("\n\n")[0].replace(/^\*\*Headline:\s*|\*\*$/g, '') || "No Headline"}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {typeof item.news === "object"
                  ? item.news?.news.split("\n\n")[1] || "No News Available"
                  : item.news || "No News Available"}
              </p>
              <div className="mt-3 text-sm text-gray-500">
                {Array.isArray(item.news.industries) && (
                  <p><strong className='text-primary-accent'>Industries:</strong> {item.news.industries.join(", ")}</p>
                )}
                {Array.isArray(item.news.locations) && (
                  <p><strong className='text-primary-accent'>Locations:</strong> {item.news.locations.join(", ")}</p>
                )}
                {item.news.government_scheme && (
                  <p><strong className='text-primary-accent'>Gov Scheme:</strong> {item.news.government_scheme}</p>
                )}
                {item.news.trade && (
                  <p><strong className='text-primary-accent'>Trade:</strong> {item.news.trade}</p>
                )}
                {item.news.geopolitics && (
                  <p><strong className='text-primary-accent'>Geopolitics:</strong> {item.news.geopolitics}</p>
                )}
                {item.news.event && (
                  <p><strong className='text-primary-accent'>Event:</strong> {item.news.event}</p>
                )}
                <p className="text-sm text-gray-500">
  {new Date(item.time).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;