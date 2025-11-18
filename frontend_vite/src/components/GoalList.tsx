import { useQuery } from "@apollo/client/react";
import { GET_GOALS } from "../graphql/queries";
import type { GetGoalsData, Goal } from "../types/Goal";
import GoalCard from "./GoalCard";
import Popup from "./Popup";

export default function GoalList() {
  const { data, loading, error } = useQuery<GetGoalsData>(GET_GOALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals</p>;

  return (
    <div>
      <h2>Your Goals</h2>
      <Popup name="Add Goal" type="Goal" />
      <ul>
        {data?.getGoals.map((goal: Goal) => (
          <li key={goal.id}>
            <GoalCard {...goal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
