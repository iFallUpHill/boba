# boba
A lightweight, modular, CSS-only design framework.

[![npm](https://img.shields.io/npm/v/boba.svg)]()
[![npm](https://img.shields.io/npm/l/boba.svg)]()
[![CircleCI](https://img.shields.io/circleci/project/github/iFallUpHill/boba.svg)]()

[Check out our documentation!](buildwithboba.jasonmh.me "boba's homepage!")

To build from source:

```bash
git clone 
cd boba
npm install
gulp clean && gulp build --prod
```

Gulp commands:
* `gulp` // Default task is watch
* `gulp watch` // Runs a  watch task to automatically rebuild files when changes are made
* `gulp clean` // Deletes the dist folder
* `gulp build` // Builds the dist folder
* `gulp sass` // Compiles SASS
* `gulp nunjucks` // Renders Nunjucks to HTML

Gulp parameters
* `--prod` // Strips comments, removes sourcemaps, minifies files, builds all variations of css; this overrides all of the other parameters
* `--docs` // Includes the documentation css / nunjuck processes in the build
* `--highlight` // Applies syntax highlighting to code blocks in the documentation
* `--nomin` // Stops minification of files; useful for debugging
* `--buildall` // Builds all versions of the framework