
interface Skill {
    id: string;
    name: string;
    description: string;
}
 interface GetSkillsData {
    getSkills: Skill[];
}

export { Skill, GetSkillsData };
