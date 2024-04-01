import { describe, it, test, expect, vi } from "vitest";
import * as utils from "../utils";
import fs from "fs";

//! ============================
//! createDirIfNotExists
//! ============================

describe("createDirIfNotExists", () => {
  it("should create a directory if it does not exist", () => {
    const dir = "testDir";

    // Mock fs.existsSync and fs.mkdirSync
    vi.spyOn(fs, "existsSync").mockReturnValue(false)
    const mkdirSyncMock = vi.spyOn(fs, "mkdirSync").mockImplementation(
      () => { return dir }
    )

    utils.createDirIfNotExists(dir)

    // Check if fs.mkdirSync was called
    expect(mkdirSyncMock).toHaveBeenCalledWith(dir, { recursive: true })

    // Restore the mocks
    vi.restoreAllMocks()
  });
});

//! ============================
//! filePathToDir
//! ============================

describe("filePathToDir", () => {
  it("should return the directory path", () => {
    const filePath = "path/to/file.txt";
    const expected = "path/to";
    expect(utils.filePathToDir(filePath, "/")).toEqual(expected);
  });

  it("should return the directory path for root", () => {
    const filePath = "/a";
    const expected = "";
    expect(utils.filePathToDir(filePath)).toEqual(expected);
  });

  it("should return the directory path for empty string", () => {
    const filePath = "";
    const expected = "";
    expect(utils.filePathToDir(filePath)).toEqual(expected);
  });
});
