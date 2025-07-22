export type BigPainPoint = {
    id: string;
    problem: string;
    description: string;
    created: Date;
    validation: number | null;
    duplicates: string[];
    scrape_method: string;
    reddit_name: string | null;
    reddit_ups: number | null;
    reddit_comments: number | null;
};
