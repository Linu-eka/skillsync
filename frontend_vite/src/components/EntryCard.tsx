import type { Entry } from "../types/Entry";
import type { Step } from "../types/Step";
import { TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import type { DocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

interface EntryCardProps {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  mutation: DocumentNode;
  mutationOptions: any;
  getVariables: (id: string) => object;
}
export default function EntryCard({
  id,
  title,
  message,
  date,
  time,
  mutation,
  mutationOptions,
  getVariables,
}: EntryCardProps) {
  const [executeMutation] = useMutation(mutation, mutationOptions);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    executeMutation({ variables: getVariables(id) });
  };
  return (
    <div className="relative mb-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
        aria-label="Delete goal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>{" "}
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {title}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Date: {new Date(date).toLocaleDateString()}
      </p>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Time: {time.substring(0, 5)}
      </p>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Notes: {message}
      </p>
    </div>
  );
}
