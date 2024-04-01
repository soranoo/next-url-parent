import { describe, it, test, expect, vi } from "vitest";
import { getParentUrl } from "../index";

describe("getParentUrl", () => {
  // it("should return the parent URL without query string", () => {
  //   const url = "http://example.com/parent/child?param1=value1&param2=value2";
  //   const result = getParentUrl(url);
  //   expect(result).toBe("http://example.com/parent");
  // });

  // it("should return the parent URL with query string", () => {
  //   const url = "http://example.com/parent/child?param1=value1&param2=value2";
  //   const result = getParentUrl(url, true);
  //   expect(result).toBe("http://example.com/parent?param1=value1&param2=value2");
  // });

  // it("should return the parent URL with whitelisted query string", () => {
  //   const url = "http://example.com/parent/child?param1=value1&param2=value2";
  //   const result = getParentUrl(url, true, ["param1"]);
  //   expect(result).toBe("http://example.com/parent?param1=value1");
  // });

  // it("should return the parent URL without blacklisted query string", () => {
  //   const url = "http://example.com/parent/child?param1=value1&param2=value2";
  //   const result = getParentUrl(url, true, undefined, ["param2"]);
  //   expect(result).toBe("http://example.com/parent?param1=value1");
  // });
});
