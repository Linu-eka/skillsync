
interface Goal {
    id: string;
    name: string;
    description: string;
    steps: Step[];
}
 interface GetGoalsData {
    getGoals: Goal[];
}

interface getGoalData {
    getGoalById: Goal;
}

interface getStepsData {
    getStepsById: Step[];
}



export { Goal, GetGoalsData, getGoalData, getStepsData };
