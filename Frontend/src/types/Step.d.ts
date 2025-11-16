
interface Step {
    id: string;
    title: string;
    description: string;
    entries: Entry[];
}

interface getEntriesData {
    getEntriesById: Step[];
}
export { Step, getEntriesData };