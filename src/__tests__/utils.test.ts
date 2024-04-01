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
