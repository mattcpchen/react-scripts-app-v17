require('@babel/polyfill');

//var indexHtmlPath = path.join(__dirname, './public-babel/index.html');

const allJsBFE = require.context(__dirname, true, /^(?!.*\.(spec|story)\.(js|tsx)$).*\.js$/);

[allJsBFE].forEach(folder => {
  folder.keys().forEach(file => folder(file));
});
