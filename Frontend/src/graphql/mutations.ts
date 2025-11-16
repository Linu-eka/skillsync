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