import { gql } from "@apollo/client";

export const GET_HOME = gql`
  query getHome {
    allHomePages {
      id
      logo {
        url
      }
      heroSub
      heroTitle
      heroSubtitle
      heroImage {
        url
      }
      skills {
        alt
        url
        title
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
