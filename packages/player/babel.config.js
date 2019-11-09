module.exports = function(api) {
  api.cache(true);

  const TARGET_PLATFORM = process.env.BABEL_ENV;
  const TARGET_ENV = process.env.NODE_ENV;

  const plugins = ["babel-plugin-lodash", "@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"];
  const presets = ["@babel/preset-react", "@emotion/babel-preset-css-prop"];


  presets.push(["@babel/preset-env", {
    "targets": {
      "browsers": ["last 2 versions", "safari 7", "IE 11"]
    },
    "useBuiltIns": false,
    "modules": false,
    "exclude": [
      "transform-regenerator"
    ],
    loose: true,
  }]);


  return {
    presets,
    plugins,
  }
};
