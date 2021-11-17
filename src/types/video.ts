export type Video = {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: Date;
    stats?: VideoStats;
};

export type VideoStats = {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
};