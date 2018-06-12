# boba
A lightweight, modular, CSS-only design framework.

[![npm](https://img.shields.io/npm/v/boba.svg)]()
[![npm](https://img.shields.io/npm/l/boba.svg)]()
[![CircleCI](https://img.shields.io/circleci/project/github/iFallUpHill/boba.svg)]()

[Check out our documentation!](https://buildwithboba.com/ "boba's homepage!")

## What is boba?

boba was born out of frustration with other CSS design frameworks.

* Lightweight at just ~10KB gzipped
* Modular; easily add or remove components or classes
* Semantic class names to speed up development 
* Responsive, flexbox-based grid system
* Vibrant, fresh color palette
* **No JavaScript**

## Is boba for you?

Of course it is!

Be it a smaller project or production-scale website, boba has all of the utilities and components that you need to get started quickly and efficiently. In fact, [our entire website](https://buildwithboba.com/ "boba's homepage!"), including [our documentation](https://buildwithboba.com/docs/ "boba's documentation!"), is built entirely using boba's built-in classes.

## Getting Started

### Installation

boba can be installed manually, requested via CDN, or installed via NPM / yarn. 

Check out [our installation guide](https://buildwithboba.com/docs/installation.html "installing boba!") for more information.

## Browser Support

Boba uses [autoprefixer](https://github.com/postcss/autoprefixer "autoprefixer") to automatically generate browser-specific prefixes needed to support the latest two versions of each browser.

| Browser | Supported Version |
| :------ | :---------------: | 
| Internet Explorer | 10+ |
| Edge | Last 2 |
| Mozilla Firefox | Last 2 |
| Google Chrome | Last 2 |
| Safari | Last 2 |
| Opera | Last 2 |

Although most of boba is compatible with Internet Explorer 10+, some HTML5 / CSS3 features may not be fully supported.

## Building boba

You can compile your custom version of boba. Check out [our documentation](https://buildwithboba.com/docs/customize.html "customize boba!") for more information.

```bash
git clone 
cd boba
npm install
gulp clean && gulp build --prod
```

#### Gulp Commands

* `gulp` // Default task is watch
* `gulp watch` // Runs a  watch task to automatically rebuild files when changes are made
* `gulp clean` // Deletes the dist folder
* `gulp build` // Builds the dist folder
* `gulp sass` // Compiles SASS
* `gulp nunjucks` // Renders Nunjucks to HTML (docs only; requires the `--docs` flag)
* `gulp scripts` // Compiles JavaScript files into one bundle (docs only; requires the `--docs` flag)
* `gulp showcase` // Generates the showcase preview images (docs only; requires the `--docs` flag)


#### Gulp Parameters

* `--prod` // Strips comments, removes sourcemaps, minifies files, builds all variations of CSS; this overrides all of the other parameters
* `--docs` // Includes the documentation CSS / nunjuck processes in the build
* `--highlight` // Applies syntax highlighting to code blocks in the documentation
* `--rebuildShowcase` // Regenerates the showcase screenshots
* `--version` // Accepts 'major', 'minor', and 'patch' as values; used to specify the documentation version target corresponding to an npm version increment
* `--nomin` // Stops minification of files; useful for debugging
* `--buildall` // Builds all versions of the framework
