export type Channel = {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: Date;
    details?: ChannelDetails;
};

export type ChannelDetails = {
    tags: string[];
    uploadsPlaylistId: string;
    subscriberCount: number;
    totalViewCount: number;
    videoCount: number;
};