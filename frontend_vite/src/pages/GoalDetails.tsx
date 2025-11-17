import type { Goal } from "../types/Goal";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_GOAL } from "../graphql/queries";

export default function GoalDetails() {
  // Use the id from the route parameters (uncomment this if you want dynamic IDs)
  // const { id } = useParams<{ id: string }>();

  // Get the goal with id 1 (hardcoded for now)
  const { data, loading, error } = useQuery<{ getGoalById: Goal }>(GET_GOAL, {
    variables: { id: "1" },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goal details</p>;

  return (
    <div>
      <h2>{data?.getGoalById.name}</h2>
      <p>Description: {data?.getGoalById.description}</p>
      <h3>Steps:</h3>
      <ul>
        {data?.getGoalById.steps.map((step) => (
          <li key={step.id}>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
