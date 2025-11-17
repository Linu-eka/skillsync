
interface Step {
    id: string;
    title: string;
    description: string;
    entries: Entry[];
}

interface GetStep{
    getStep: Step;
}


export { Step, GetStep };