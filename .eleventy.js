const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Set Markdown library
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    })
  );

  // Blog
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.md");
  });

  // Define 11ty template formats
  eleventyConfig.setTemplateFormats([
    "njk",
    "md",
    "svg",
    "jpg",
    "css",
    "png",
    "11ty.js",
  ]);

  eleventyConfig.addFilter("excerpt", (value, len = 75, ellipsis = "…") => {
    if (!value) return "";
    const text = value.replace(/(<([^>]+)>)/gi, "");
    const words = text.split(/\s+/).slice(0, len);
    return words.join(" ") + (text.split(/\s+/).length > len ? ellipsis : "");
  });

  eleventyConfig.addFilter("date", (value, format = "dd.MM.yyyy") => {
    if (!value) return "";
    let dt = DateTime.fromISO(value);
    if (!dt.isValid) dt = DateTime.fromJSDate(new Date(value));
    return dt.toFormat(format);
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("xmlEscape", function (value) {
    if (!value) return "";
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy({
    "./src/site.webmanifest": "site.webmanifest",
  });

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "docs",
    },
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "svg", "jpg", "css", "png", "11ty.js"],
  };
};
