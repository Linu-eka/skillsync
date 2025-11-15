import {gql} from '@apollo/client';

export const GET_SKILLS = gql`
  query GetSkills {
    getSkills { 
        id
        name
        description
    }
  }
`;

export const GET_GOALS = gql`
  query GetGoals {
    getGoals {
        id
        name
        description

        }
  }`;