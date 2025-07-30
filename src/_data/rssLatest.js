const Parser = require("rss-parser");
const parser = new Parser();

async function fetchFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    const item = feed.items[0];
    if (!item) return null;
    return {
      title: item.title || "No title",
      link: item.link || "",
      date: item.pubDate ? new Date(item.pubDate) : null,
      content: item.content || item.contentSnippet || "",
      source: feed.title || "Unknown source",
    };
  } catch (e) {
    console.error(`Failed to fetch ${url}:`, e);
    return null;
  }
}

module.exports = async function () {
  const urls = [
    "https://activemotif.podbean.com/feed.xml",
    "https://inside-the-dugout.de/feed.rss",
    "https://raincastle.blog/blog.rss",
    "https://epigenetics-podcast.micro.blog/feed.xml"
  ];

  let latestItems = [];
  for (const url of urls) {
    const latest = await fetchFeed(url);
    if (latest && latest.date && !isNaN(latest.date)) {
      latestItems.push(latest);
    }
  }

  // Sort by date (newest first)
  latestItems.sort((a, b) => b.date - a.date);

  return latestItems;
};
