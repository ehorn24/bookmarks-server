const uuid = require("uuid/v4");

const bookmarks = [
  {
    id: uuid(),
    title: "Google",
    url: "https://www.google.com",
    description: "Searching things!",
    rating: 5
  },
  {
    id: uuid(),
    title: "LinkedIn",
    url: "https://www.linkedin.com",
    description: "LinkedIn website",
    rating: 4
  }
];

module.exports = { bookmarks };
