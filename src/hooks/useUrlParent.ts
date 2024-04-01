import React, { useState, useEffect } from "react";
import { getParentUrl } from "../index";
import { usePathname, useSearchParams } from "next/navigation";

type useUrlParentType = (options?: {
  keepQueryString?: boolean;
  queryStringWhitelist?: string[];
  queryStringBlacklist?: string[];
  defaultParentUrl?: string;
}) => string;

export const useUrlParent: useUrlParentType = ({
  keepQueryString = false,
  queryStringWhitelist,
  queryStringBlacklist,
  defaultParentUrl = "",
} = {}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const [parentUrl, setParentUrl] = useState<string>(defaultParentUrl);

  useEffect(() => {
    const url = `${pathname}${searchParams.toString()}`;
    setParentUrl(getParentUrl(url, keepQueryString, queryStringWhitelist, queryStringBlacklist));
  }, [pathname, searchParams]);

  return parentUrl;
};
