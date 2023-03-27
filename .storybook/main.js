module.exports = {
  stories: [
    '../src/**/*.story.@(js|ts|tsx)',
  ],
  addons: [
    "storybook-css-modules", // 👈 allow css-module for storybook
  ],
};