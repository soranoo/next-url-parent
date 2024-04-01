import { describe, it, test, expect, vi } from "vitest";
import { findAllPagePaths } from "../dir-watcher";
import * as fs from "fs";
import * as path from "path";
import { Dirent } from "fs";

describe("findAllPagePaths", () => {
  // it("should return all paths that match 'page.*' pattern", () => {
  //   vi.spyOn(fs, "readdirSync").mockImplementation((folderPath) => {
  //     if (folderPath === "testFolder") {
  //       return ["page.1", "page.2", "notPage", "subFolder"];
  //     }
  //     if (folderPath === path.join("testFolder", "subFolder")) {
  //       return ["page.3"];
  //     }
  //     return [];
  //   });

  //   vi.spyOn(fs, "statSync").mockImplementation((filePath) => {
  //     if (filePath === path.join("testFolder", "subFolder")) {
  //       return { isDirectory: () => true, isFile: () => false };
  //     }
  //     return { isDirectory: () => false, isFile: () => true };
  //   });

  //   const result = findAllPagePaths("testFolder");
  //   expect(result).toEqual([
  //     path.join("testFolder", "page.1"),
  //     path.join("testFolder", "page.2"),
  //     path.join("testFolder", "subFolder", "page.3"),
  //   ]);

  //   // Restore the mocks
  //   vi.restoreAllMocks();
  // });
});
