# boba
A lightweight, modular CSS framework.

To build from source:

```
git clone 
npm install
gulp
```

Gulp commands:
* `gulp` // Default task is watch
* `gulp watch` // Runs a  watch task to automatically rebuild files when changes are made
* `gulp clean` // Deletes the dist folder
* `gulp build` // Builds the dist folder
* `gulp sass` // Compiles SASS
* `gulp nunjucks` // Renders Nunjucks to HTML

Gulp parameters
* `--prod` // Strips comments, minifies files, builds all variations of css; This overrides all of the other parameters
* `--nomin` // Stops minification of files; Useful for debugging
* `--buildall` // Builds all versions of the framework