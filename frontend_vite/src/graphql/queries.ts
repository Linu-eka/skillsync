import {gql} from '@apollo/client';

export const GET_GOALS = gql`
  query GetGoals {
    getGoals {
        id
        name
        description

        }
  }`;

  export const GET_GOAL = gql`
  query GetGoal($id: ID!) {
  getGoalById(id: $id) {
    id
    name
    description
    steps {
      id
      title
      description
    }
  }
}`;

  export const GET_STEPS = gql`
  query GetSteps($id: ID!) {
  getStepsById(id: $id) {
    id
    title
    description
  }
}`;

export const GET_ENTRIES = gql`
query GetEntries($id: ID!) {
  getEntriesById(id: $id) {
    id
    title
  }
}`;
  

