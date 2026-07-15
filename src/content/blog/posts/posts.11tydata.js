export default {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Blog",
    },
  },
};
