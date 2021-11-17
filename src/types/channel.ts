export type Channel = {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: Date;

    
};

export type ChannelDetails = {
    tags: string[];
    uploadsPlaylistId: string;
    subscriberCount: number;
    totalViewCount: number;
    videoCount: number;
};