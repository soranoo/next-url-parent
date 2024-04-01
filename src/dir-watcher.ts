import watcher from "@parcel/watcher";
import * as fs from "fs";
import path from "path";
import { createDirIfNotExists, filePathToDir, log } from "./utils";
import { PATHS } from "./constants";
import yargs from "yargs";

let appDirPath = "./src/app";
const outputJsonPath = PATHS.DIR_TREE_JSON;

// Check if worker directory exists
if (!fs.existsSync(appDirPath)) {
  log.error(`App directory does not exist: ${appDirPath}`);
  process.exit(1);
}

createDirIfNotExists(filePathToDir(outputJsonPath));

const watch = () => {
  log.plain(`👀 Watching directory: ${appDirPath}`);
  // Watch the worker directory
  watcher.subscribe(appDirPath, (err, events) => {
    if (err) {
      log.error(`Failed to watch directory: ${appDirPath}`);
    } else {
      generate();
    }
  });
}

const generate = () => {
  // If appDirPath start with "./" then remove it
  const dir = appDirPath.replace(/^\.\//, "");
  const regex = `^${dir.replace(/\//g, "\\\\")}`;
  const filePaths = findAllPagePaths(appDirPath);
  const relativePaths = filePaths.map(filePath => filePath.replace(new RegExp(regex), ""));
  const tree = JSON.stringify(createDirTree(relativePaths));
  // Save to file
  fs.writeFileSync(outputJsonPath, tree, "utf-8");
  log.success("Directory tree updated")
}

//!=============================
//! Functions
//!=============================

export const findAllPagePaths = (folderPath: string, result: string[] = []) => {
  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      findAllPagePaths(filePath, result); // Recursively scan subfolder
    } else if (stats.isFile() && file.match(/^page\./)) {
      result.push(filePath); // Record the path if the file name matches "page.*"
    }
  });

  return result;
}

export const createDirTree = (filePaths: string[]) => {
  const pathSegmentSchema = /^[a-zA-Z\d]+/;
  const dynamicSegmentSchema = /\[.*\]/;
  const tree: Record<string, any> = {};

  filePaths.forEach((filePath, i) => {
    const pathSegments = filePath.split(/\\|\/|\\/);
    pathSegments.pop(); // Remove the last segment
    let currentLevel = tree;

    pathSegments.forEach((segment) => {
      // Chain the path segments to create the tree
      // eg. "app/_a/b/c" => "{ app: { b: { c: {} } } }"
      if (pathSegmentSchema.test(segment)) {
        if (!currentLevel[segment]) {
          currentLevel[segment] = {};
        }
        currentLevel = currentLevel[segment];
      } else if (dynamicSegmentSchema.test(segment)) {
        if (!currentLevel["[]"]) {
          currentLevel["[]"] = {};
        }
        currentLevel = currentLevel["[]"];
      }
    });
  });

  return tree;
}

//!=============================
//! CLI
//!=============================

export const cli = () => {
  const argv = yargs.option("appDir", {
    alias: "i",
    type: "string",
    description: "Path to the app directory",
  }).option("watch", {
    alias: "w",
    type: "boolean",
    description: "Watch the app directory for changes",
  }).argv;

  // @ts-ignore
  if (argv.appDir) {
    // @ts-ignore
    appDirPath = path.resolve(process.cwd(), argv.appDir);
  }

  // @ts-ignore
  if (argv.watch) {
    generate();
    watch();
  } else {
    generate();
  }
}
