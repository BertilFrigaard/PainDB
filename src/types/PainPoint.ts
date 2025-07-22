export type PainPoint = {
    id: string;
    problem: string;
    description: string;
    created: Date;
    validation: number | null;
    duplicates: string[];
    favorite: boolean;
};
