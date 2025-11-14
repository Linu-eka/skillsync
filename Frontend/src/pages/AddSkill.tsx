import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_SKILL } from "../graphql/mutations";
import { GET_SKILLS } from "../graphql/queries";

export default function AddSkill() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [addSkill] = useMutation(ADD_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill({ variables: { name, description } });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Skill</h2>
      <input
        type="text"
        placeholder="Skill Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Skill Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Skill</button>
    </form>
  );
}
