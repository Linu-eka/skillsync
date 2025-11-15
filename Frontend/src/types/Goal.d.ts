
interface Goal {
    id: string;
    name: string;
    description: string;
}
 interface GetGoalsData {
    getGoals: Goal[];
}

export { Goal, GetGoalsData };
