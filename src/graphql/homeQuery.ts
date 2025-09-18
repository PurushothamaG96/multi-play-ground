import { gql } from "@apollo/client";

export const GET_HOME = gql`
  query getHome{
    allHomePages {
      id
      heroTitle
      heroSubtitle
      heroImage {
        url
      }
      heroBadges
      _status
      _firstPublishedAt
    }
    _allHomePagesMeta {
      count
    }
  }
`;
