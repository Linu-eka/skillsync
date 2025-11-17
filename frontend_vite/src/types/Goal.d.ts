import type { Step } from "./Step";

interface Goal {
    id: string;
    name: string;
    description: string;
    steps: Step[];
}
 interface GetGoalsData {
    getGoals: Goal[];
}
interface GetGoalData {
    getGoal: Goal;
}

interface GetStepData {
    getStepsById: string[];
}

export { Goal, GetGoalsData, GetGoalData, GetStepData };
