# next-my-url-parent

Project starts on 30-03-2024

<!-- ![Tests](https://github.com/soranoo/next-css-obfuscator/actions/workflows/auto_test.yml/badge.svg)  -->

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)&nbsp;&nbsp;&nbsp;[![Donation](https://img.shields.io/static/v1?label=Donation&message=❤️&style=social)](https://github.com/soranoo/Donation)

[![npm version](https://img.shields.io/npm/v/next-my-url-parent?color=red&style=flat)](https://www.npmjs.com/package/next-my-url-parent) [![npm downloads](https://img.shields.io/npm/dt/next-my-url-parent?color=blue&style=flat)](https://www.npmjs.com/package/next-my-url-parent)

Get the parent URL of the current URL in Next.js APP router.

<!-- ## 🗝️ Features

-  -->

## 📦 Requirements

- A Next.js project using app router.

## 🚀 Getting Started

### Installation

```bash
npm install next-my-url-parent
```

Visit the [npm](https://www.npmjs.com/package/next-css-obfuscator) page.

### Setup `package.json`
Add the following code to `package.json`:

```javascript
"scripts": {
 // other scripts ...
 "mup@gen": "next-my-url-parent"
 "mup@watch": "next-my-url-parent --watch"
 },
```

Read [💻 CLI](#-cli) for more details.

### Usage 🎉

> [!NOTE]\
> You must run the `next-my-url-parent` command once to get the function and hook working.

#### Function
```javascript
import { getMyUrlParent } from "next-my-url-parent";

console.log(getMyUrlParent("https://example.com/parent/child"));
// -> "https://example.com/parent"

console.log(getMyUrlParent("https://example.com/parent/child?key1=value1&key2=value2", { 
  keepQueryString = true,
  queryStringWhitelist = ["key1"],
}));
// -> "https://example.com/parent?key1=value1"

console.log(getMyUrlParent("https://example.com/parent/child?key1=value1&key2=value2", { 
  keepQueryString = true,
  queryStringBlacklist = ["key1"],
}));
// -> "https://example.com/parent?key2=value2"
```

##### Options
| Option| Optional | Type| Default| Description|
| --- | --- | --- | --- | --- |
|`url`| :x: | `string` | | The child URL. |
| `keepQueryString` | ✅ | `boolean` | `false` | Keep the child URL query string. |
| `queryStringWhitelist` | ✅ | `string[]` | `[]` | Whitelist of query string keys. |
| `queryStringBlacklist` | ✅ | `string[]` | `[]` | Blacklist of query string keys. |

#### Hook
```javascript
import { useMyUrlParent } from "next-my-url-parent";

const MyPage = () => {
  const parentUrl = useMyUrlParent();

  // Default Options
  const parentUrl = useMyUrlParent({ 
    keepQueryString = false,
    queryStringWhitelist = [],
    queryStringBlacklist = [],
    defaultParentUrl = "",
  });

  return (
    <div>
      <h1>Parent URL: {parentUrl}</h1>
    </div>
  );
};

```

##### Options
| Option| Optional | Type| Default| Description|
| --- | --- | --- | --- | --- |
| `keepQueryString` | ✅ | `boolean` | `false` | Keep the child URL query string. |
| `queryStringWhitelist` | ✅ | `string[]` | `[]` | Whitelist of query string keys. |
| `queryStringBlacklist` | ✅ | `string[]` | `[]` | Blacklist of query string keys. |
| `defaultParentUrl` | ✅ | `string` | `""` | Default parent URL before the parent URL is resolved. |


## 💻 CLI

```bash
next-my-url-parent --appDir=./src/app --watch
```
Generate a path map.

| Option            | Optional | Type      | Default     | Description                              |
| ----------------- | -------- | --------- | ----------- | ---------------------------------------- |
| `--appDir` / `-i` | ✅       | `string`  | `./src/app` | The directory of the Next.js app.        |
| `--watch` / `-w`  | ✅       | `boolean` | `false`     | Watch the files and obfuscate on change. |

## ⭐ TODO

- [ ] Tests

## 🐛 Known Issues

- \

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## ☕ Donation

Love it? Consider a donation to support my work.

[!["Donation"](https://raw.githubusercontent.com/soranoo/Donation/main/resources/image/DonateBtn.png)](https://github.com/soranoo/Donation) <- click me~
