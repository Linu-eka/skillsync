"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation } from "@apollo/client/react";
import { GET_GOALS } from "../graphql/queries";
import { GET_ENTRIES_AND_STEP } from "../graphql/queries";
import { GET_GOAL } from "../graphql/queries";

import { ADD_GOAL } from "../graphql/mutations";
import { ADD_STEP } from "../graphql/mutations";
import { ADD_ENTRY } from "../graphql/mutations";

function NewStepForm({
  handleClose,
  goalId,
}: {
  handleClose: () => void;
  goalId?: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addStep] = useMutation(ADD_STEP, {
    refetchQueries: [{ query: GET_GOAL, variables: { id: goalId } }],
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStep({
      variables: { title: name, description: description, goalId: goalId },
    });
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
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-white"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  required={true}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-white"
              >
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400 mb-3">
                Write a few sentences describing your work.
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
                onClick={() => handleClose()}
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

function NewEntryForm({
  handleClose,
  stepId,
}: {
  handleClose: () => void;
  stepId?: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addEntry] = useMutation(ADD_ENTRY, {
    refetchQueries: [
      { query: GET_ENTRIES_AND_STEP, variables: { id: stepId } },
    ],
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({
      variables: { title: name, message: description, stepId: stepId },
    });
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
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-white"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  required={true}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-white"
              >
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400 mb-3">
                Write a few sentences describing your work.
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
                onClick={() => handleClose()}
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

function NewGoalForm({ handleClose }: { handleClose: () => void }) {
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
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-white"
              >
                Goal Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Goal Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  required={true}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-white"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400 mb-3">
                Write a few sentences describing your goal.
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
                onClick={() => handleClose()}
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
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-white"
                    >
                      {name}
                    </DialogTitle>
                    <div className="mt-2">
                      {/* Form to add Goal, Step or Entry */}
                      <p className="text-sm text-gray-400">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                      {type === "Goal" && (
                        <NewGoalForm handleClose={() => setOpen(false)} />
                      )}
                      {type === "Step" && (
                        <NewStepForm
                          handleClose={() => setOpen(false)}
                          goalId={id}
                        />
                      )}
                      {type === "Entry" && (
                        <NewEntryForm
                          handleClose={() => setOpen(false)}
                          stepId={id}
                        />
                      )}
                    </div>
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
