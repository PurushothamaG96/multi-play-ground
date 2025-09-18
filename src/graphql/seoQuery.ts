import { gql } from "@apollo/client";

export const GET_SEO = gql`
  query {
    _site {
      globalSeo {
        siteName
        fallbackSeo {
          title
          description
        }
      }
    }
  }
`;
