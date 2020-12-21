---
title: Yarn
categories:
  - JavaScript
  - Libraries
author: BAI
---

## Yarn

### 与 npm 对照表

| npm                                        | yarn                          |
| ------------------------------------------ | ----------------------------- |
| `npm init`                                 | `yarn init`                   |
| `npm install`                              | `yarn`                        |
| `npm install gulp --save`                  | `yarn add gulp`               |
| `npm install gulp --save-dev --save-exact` | `yarn add gulp --dev --exact` |
| `npm install -g gulp`                      | `yarn global add gulp`        |
| `npm update`                               | `yarn upgrade`                |
| `./node_modules/.bin/gulp`                 | `yarn run gulp`               |

### yarn install

`yarn install` 的参数

```shell
--no-lockfile
--pure-lockfile
--frozen-lockfile
--silent
--offline
--update-checksums
--check-files
--flat
--force
--ignore-scripts
--modules-folder <path>
--production[=true|false]
```

### yarn add

```shell
--dev
--peer
--optional
--exact
--tilde
```

These options are available for `yarn add`.

### Workspaces

In `package.json`:

```json
"workspaces": [
  "packages/*"
]
```

```text
jest/
├─ package.json
└─ packages/
   ├─ jest-matcher-utils/
   │  └─ package.json
   └─ jest-diff/
      └─ package.json
```

### Resolution

In `package.json`:

```json
"resolutions": {
  "**/sass-brunch/node-sass": "4.5.2"
}
```

### Create

```bash
yarn create react-app hello
```
