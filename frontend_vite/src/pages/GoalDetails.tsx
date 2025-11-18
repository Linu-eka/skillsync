import type { Goal } from "../types/Goal";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_GOAL } from "../graphql/queries";
import StepCard from "../components/StepCard";
import Popup from "../components/Popup";
import { DELETE_STEP } from "../graphql/mutations";
export default function GoalDetails() {
  // Use the id from the route parameters (uncomment this if you want dynamic IDs)
  const { id } = useParams<{ id: string }>();

  // Get the goal with id 1 (hardcoded for now)
  const { data, loading, error } = useQuery<{ getGoalById: Goal }>(GET_GOAL, {
    variables: { id: id },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goal details</p>;

  return (
    <div>
      <h2>{data?.getGoalById.name}</h2>
      <h3>Description: {data?.getGoalById.description}</h3>
      <h3>Steps:</h3>
      <Popup name="Add Step" type="Step" id={id} />
      <ul>
        {data?.getGoalById.steps.map((step) => (
          <li key={step.id}>
            <StepCard
              id={step.id}
              title={step.title}
              description={step.description}
              mutation={DELETE_STEP}
              mutationOptions={{
                refetchQueries: [{ query: GET_GOAL, variables: { id } }],
              }}
              getVariables={(id: string) => ({ id })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
