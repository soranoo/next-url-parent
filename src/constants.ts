import path from "path";

export const PATHS = {
  // DIR_TREE_JS: path.join(__dirname, "__generated__/dir-tree.mjs"),
  DIR_TREE_JS: path.join("./src/__generated__/next-url-parent-dir-tree.mjs"),
} as const;

export const IMPORT = {
  DIR_TREE_JS: "../../../src/__generated__/next-url-parent-dir-tree.mjs",
} as const;
