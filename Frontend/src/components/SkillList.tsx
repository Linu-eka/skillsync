import { useQuery } from "@apollo/client/react";
import { GET_SKILLS } from "../graphql/queries";
import { GetSkillsData, Skill } from "../types/Skill";

export default function SkillList() {
  const { data, loading, error } = useQuery<GetSkillsData>(GET_SKILLS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading skills</p>;

  return (
    <div>
      <h2>Your Skills</h2>
      <ul>
        {(data?.getSkills ?? []).map((skill: Skill) => (
          <li key={skill.id}>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
