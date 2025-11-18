import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { GET_ENTRIES_AND_STEP } from "../graphql/queries"; // Combine queries
import type { Entry } from "../types/Entry";
import type { Step } from "../types/Step";
import EntryCard from "../components/EntryCard";
import Popup from "../components/Popup";

export default function EntriesView() {
  const { id } = useParams<{ id: string }>();

  // Combined query for both entries and step details
  const { data, loading, error } = useQuery<{
    getEntriesById: Entry[];
    getStepById: Step;
  }>(GET_ENTRIES_AND_STEP, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h2>Step: {data?.getStepById.title}</h2>
      <Popup name="Add Entry" type="Entry" id={id} />
      {data?.getEntriesById.map((entry) => (
        <div key={entry.id}>
          <EntryCard {...entry} />
        </div>
      ))}
    </div>
  );
}
