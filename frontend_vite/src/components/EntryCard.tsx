import type { Entry } from "../types/Entry";
export default function EntryCard(entry: Entry) {
  return (
    <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {entry.title}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Date: {new Date(entry.date).toLocaleDateString()}
      </p>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Time: {entry.time.substring(0, 5)}
      </p>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        Notes: {entry.message}
      </p>
    </div>
  );
}
