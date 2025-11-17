import {gql} from '@apollo/client';

export const ADD_SKILL = gql`
  mutation AddSkill($name: String!, $description: String!) {
    addSkill(name: $name, description: $description) {
        id
        name
        description
    }   
    }
`;

export const ADD_GOAL = gql`
mutation AddGoal ($name: String!, $description: String){
  addGoal(name: $name, description: $description) {
    id
    name
    description
  }
  }
`;

export const ADD_STEP = gql`
mutation AddStep($goalId: ID!, $title: String!, $description: String) {
  addStep(goalId: $goalId, title: $title, description: $description) {
    id
    title
    description
  }
}
`;

export const ADD_ENTRY = gql`
mutation AddEntry($stepId: ID!, $title: String!) {
  addEntry(stepId: $stepId, title: $title) {
    id
    title
    message
  }
}
`;
