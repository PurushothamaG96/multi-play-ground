import { secrets } from "@/config/vars";
import { executeQuery } from "@datocms/cda-client";
import { DocumentNode } from "graphql";

interface RequestOptions {
  variables?: Record<string, any>;
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
}

export const performRequest = async <T>(
  query: DocumentNode,
  options?: RequestOptions
): Promise<T> => {
  const data = await executeQuery<T>(query, {
    ...options,
    token: secrets.datocmsToken!,
    environment: secrets.datocmsEnv!,
  });

  return data;
};
