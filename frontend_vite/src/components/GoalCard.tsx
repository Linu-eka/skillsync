import { TERipple } from "tw-elements-react";
import type { Goal } from "../types/Goal";
import { useNavigate } from "react-router-dom";
import { DELETE_GOAL } from "../graphql/mutations";
import type { DocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type React from "react";
interface GoalCardProps {
  id: string;
  name: string;
  description: string;
  mutation: DocumentNode;
  mutationOptions: any;
  getVariables: (id: string) => object;
}
export default function GoalCard({
  id,
  name,
  description,
  mutation,
  mutationOptions,
  getVariables,
}: GoalCardProps) {
  const navigate = useNavigate();
  const [executeMutation] = useMutation(mutation, mutationOptions);
  const handleClick = () => {
    //Navigate to Goal details page while passing the Goal(data) as a parameter
    navigate(`/goal/${id}`);
  };

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
      </button>
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {name}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {description}
      </p>
      <TERipple>
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleClick}
        >
          View Details
        </button>
      </TERipple>
    </div>
  );
}
