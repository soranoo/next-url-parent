import { IMPORT, PATHS } from "./constants";

export * from "./hooks/useUrlParent";

let dirTree = {}
try {
  // ({ dirTree } = require(IMPORT.DIR_TREE_JS));
  //! idk why I can't use the above line, but I can use the below line
  ({ dirTree } = require("../../../src/__generated__/next-url-parent-dir-tree.mjs"));
} catch (error) {
  console.error(`⛔ Mssing directory tree file: ${IMPORT.DIR_TREE_JS}, please run the generate command`);
}

const routes: Record<string, any> = dirTree;


/**
 * Get the parent URL of a given URL
 * @param url The child URL to get the parent URL
 * @param keepQueryString True to keep the query string, false otherwise
 * @param queryStringWhitelist An array of query string keys to keep
 * @param queryStringBlacklist An array of query string keys to remove
 * @returns The parent URL
 */
export const getParentUrl = (
  url: string,
  keepQueryString: boolean = false,
  queryStringWhitelist?: string[],
  queryStringBlacklist?: string[]
): string => {
  let queryString = "";
  if (keepQueryString) {
    const urlParts = url.split("?");
    url = urlParts[0]!;
    if (urlParts[1]) {
      const queryParams = new URLSearchParams(urlParts[1]);
      queryString = "?";
      queryParams.forEach((value, key) => {
        if (
          (!queryStringWhitelist || queryStringWhitelist.includes(key)) &&
          (!queryStringBlacklist || !queryStringBlacklist.includes(key))
        ) {
          queryString += `${key}=${value}&`;
        }
      });
      queryString = queryString.slice(0, -1); // Remove the last "&"
    }
  }

  const segments = url.split("/").filter(Boolean); // Split URL into segments and remove empty segments
  segments.pop(); // Remove the last segment

  // Traverse the routes object based on the segments of the URL
  let parentUrl = url.startsWith("http") ? `${segments.shift()}/` : "";
  let currentRoutes = routes;
  for (const segment of segments) {
    if (currentRoutes[segment]) {
      parentUrl += "/";
      parentUrl += segment;
      currentRoutes = currentRoutes[segment];
    } else if (currentRoutes["[]"]) { // Check for dynamic route
      parentUrl += "/";
      parentUrl += segment;
      currentRoutes = currentRoutes["[]"];
    } else {
      break;
    }
  }

  return parentUrl + queryString;
}
// Example routes object
// const routes = {
//   "auth": {
//     "login": {},
//     "logout": {},
//     "account": {
//       "[]": { // <-- This is a dynamic route
//         "detail": {}
//       }
//     }
//   }
// };


// Example usage
// let url = "/auth/account/11323/detail?tab=orders";
// let parentUrl = getParentUrl(url, true);
// console.log("Parent URL:", parentUrl); // Output: "/auth/account/11323/"

// url = "/auth/account/11323";
// parentUrl = getParentUrl(url);
// console.log("Parent URL:", parentUrl); // Output: "/auth/account/"

// url = "/b/account";
// parentUrl = getParentUrl(url);
// console.log("Parent URL:", parentUrl); // Output: "/auth/account/"

// url = "/auth/logout";
// parentUrl = getParentUrl(url);
// console.log("Parent URL:", parentUrl); // Output: "/auth/"


// url = "/auth/account/11323/detail?tab=orders&filter=active&sort=desc";
// let whitelist = ["tab", "filter"];
// let blacklist = ["sort"];
// parentUrl = getParentUrl(url, true, whitelist, blacklist);
// console.log("Parent URL:", parentUrl); // Output: "/auth/account/11323/?tab=orders&filter=active"