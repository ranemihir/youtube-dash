export type OverallAnalytics = {
    'View Count': string;
    'Like Count': string;
    'Dislike Count': string;
    'Comment Count': string;
    'Engagement Rate': string;
    'Reach': string;
};

export interface ChartDataPoints {
    viewCounts: number[];
    likeCounts: number[];
    dislikeCounts: number[];
    commentCounts: number[];
    engagementRates: number[];
    reach: number[];
};