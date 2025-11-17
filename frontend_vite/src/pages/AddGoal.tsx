import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_GOAL } from "../graphql/mutations";
import { GET_GOALS } from "../graphql/queries";

export default function AddGoal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addGoal] = useMutation(ADD_GOAL, {
    refetchQueries: [{ query: GET_GOALS }],
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({ variables: { name, description } });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Goal</h2>
      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Goal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}
