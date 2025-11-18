"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation } from "@apollo/client/react";
import type { DocumentNode } from "@apollo/client";
import { GET_GOALS, GET_ENTRIES_AND_STEP, GET_GOAL } from "../graphql/queries";
import { ADD_GOAL, ADD_STEP, ADD_ENTRY } from "../graphql/mutations";

// A configuration object for UI strings
interface FormUIStrings {
  titleLabel: string;
  descriptionLabel: string;
  descriptionHelperText: string;
}

// Props for the new generic form
interface CreationFormProps {
  handleClose: () => void;
  mutation: DocumentNode;
  mutationOptions: any;
  getVariables: (name: string, description: string) => object;
  uiStrings: FormUIStrings;
}

function CreationForm({
  handleClose,
  mutation,
  mutationOptions,
  getVariables,
  uiStrings,
}: CreationFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [executeMutation] = useMutation(mutation, mutationOptions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeMutation({ variables: getVariables(name, description) });
    setName("");
    setDescription("");
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="form-title"
                className="block text-sm/6 font-medium text-white"
              >
                {uiStrings.titleLabel}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder={uiStrings.titleLabel}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="form-title"
                  required={true}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="form-description"
                className="block text-sm/6 font-medium text-white"
              >
                {uiStrings.descriptionLabel}
              </label>
              <div className="mt-2">
                <textarea
                  id="form-description"
                  rows={3}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400 mb-3">
                {uiStrings.descriptionHelperText}
              </p>
              <button
                type="submit"
                className="mr-2 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 sm:w-1/3"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function Popup({
  name,
  type,
  id,
}: {
  name: string;
  type: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const getFormComponent = () => {
    switch (type) {
      case "Goal":
        return (
          <CreationForm
            handleClose={handleClose}
            mutation={ADD_GOAL}
            mutationOptions={{ refetchQueries: [{ query: GET_GOALS }] }}
            getVariables={(name, description) => ({ name, description })}
            uiStrings={{
              titleLabel: "Goal Name",
              descriptionLabel: "Description",
              descriptionHelperText:
                "Write a few sentences describing your goal.",
            }}
          />
        );
      case "Step":
        return (
          <CreationForm
            handleClose={handleClose}
            mutation={ADD_STEP}
            mutationOptions={{
              refetchQueries: [{ query: GET_GOAL, variables: { id } }],
            }}
            getVariables={(name, description) => ({
              title: name,
              description,
              goalId: id,
            })}
            uiStrings={{
              titleLabel: "Title",
              descriptionLabel: "Notes",
              descriptionHelperText:
                "Write a few sentences describing your work.",
            }}
          />
        );
      case "Entry":
        return (
          <CreationForm
            handleClose={handleClose}
            mutation={ADD_ENTRY}
            mutationOptions={{
              refetchQueries: [
                { query: GET_ENTRIES_AND_STEP, variables: { id } },
              ],
            }}
            getVariables={(name, description) => ({
              title: name,
              message: description,
              stepId: id,
            })}
            uiStrings={{
              titleLabel: "Title",
              descriptionLabel: "Notes",
              descriptionHelperText:
                "Write a few sentences describing your work.",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="mb-4 rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-white/20"
      >
        {name}
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline outline-1 -outline-offset-1 outline-white/10 transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-white"
                    >
                      {name}
                    </DialogTitle>
                    <div className="mt-2">{getFormComponent()}</div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
