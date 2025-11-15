import { useQuery } from "@apollo/client/react";
import { GET_GOALS } from "../graphql/queries";
import { GetSkillsData, Skill } from "../types/Skill";
import { GetGoalsData, Goal } from "../types/Goal";

export default function GoalList() {
  const { data, loading, error } = useQuery<GetGoalsData>(GET_GOALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals</p>;

  return (
    <div>
      <h2>Your Skills</h2>
      <ul>
        {(data?.getGoals ?? []).map((goal: Goal) => (
          <li key={goal.id}>
            <h3>{goal.name}</h3>
            <p>{goal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
