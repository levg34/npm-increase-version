# npm-increase-version

Increments the major/minor/fix version of your package.json for you!

## Current working conditions

Install: `npm install --save-dev npm-increase-version`

Add in package.json:

```json
  ...
  "scripts": {
    ...
    "increase-version": "node_modules/npm-increase-version/index.js"
  },
```

Run with: `npm run increase-version -- -i [f/m/M]`

Enjoy :)

## Install

Run `npm install -g npm-increase-version`

## Usage

```
  Usage: npm-increase-version [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -c, --ci                Use in CI environment. If true, determines the version solely from the last commit message (release:[fix|minor|major]). Example: release:fix fix the broken thing. (disabled by default)
    -h, --help              Output usage information
    -i, --increase [value]  The type of version to increment. For example, M or major increments the major version, m the minor, and f the fix (defaults to "minor")
    -t, --tag               Returns the tag to create (disabled by default)
    -v, --version           Output the version number
```

Example:

```bash
cd my-package # current version: 2.4.19
npm-increase-version -i fix
# output --> Upgraded from version 2.4.19 to version 2.4.20.
# current version 2.4.20
npm-increase-version
# output --> Upgraded from version 2.4.20 to version 2.5.0.
# current version 2.5.0
npm-increase-version -t
# output --> v2.5.0
npm-increase-version -i M
# output --> Upgraded from version 2.5.0 to version 3.0.0.
# current version 3.0.0
```
