[![Magnet.me Logo](https://cdn.magnet.me/images/logo-2015-full.svg)](https://magnet.me?ref=github-mm-on-enter-viewport "Discover the best companies, jobs and internships at Magnet.me")

# mm-on-enter-viewport

Directive to detect when an element has entered the viewport

# NPM run commands

Usage: `npm run <run-command>`

## `build-standalone`
Compiles a stand-alone bundle with all dependencies bundled. The bundle can be found in `/out/mm-on-enter-viewport.bundle.js`.


This bundle should only be used for testing and documentation, but it should not be distributed or required from other modules.


## `build`

Lints the project and Compiles the source with babel to ES5. The compiled files are placed in `/out` and are suitable to be `require()`d from other modules. Additionally all resources will be copied (see `copy-resources` below).



## `copy-resources`
Copies all non-javascript files to the `out/` folder. This keeps `require(<resosurce>)` calls in the source files working after compilation.


## `lint`
Runs `jshint` to validate the project.

## `watch`
Starts the compilation in watch mode. It will lint the project **once** on startup, successive compilations will skip the linting phase.

## `clean`
Cleans up the folder by removing the docs and out folders.

## `test`
Builds a standalone bundle and runs all tests on it.

## `jenkins-test`
Same as `test`, but with the Jenkins config (only runs PhantomJS and stores the output in a junit compatible format).

## `build-docs`
Creates all document files with `ng-docs`

## `live-docs`
Build all docs and serves them on port 8080.

