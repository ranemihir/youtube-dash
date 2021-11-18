import { Channel, OverallAnalytics, Video } from "../types";
import { ChartDataPoints } from "../types/analytics";


export function getOverallAnalytics(channel: Channel, videos: Video[]): OverallAnalytics {
    const { viewCount, likeCount, dislikeCount, commentCount } = videos.reduce((acc, video: Video) => ({
        viewCount: acc.viewCount + video.stats.viewCount,
        likeCount: acc.likeCount + video.stats.likeCount,
        dislikeCount: acc.dislikeCount + video.stats.dislikeCount,
        commentCount: acc.commentCount + video.stats.commentCount
    }), {
        viewCount: 0,
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0
    });

    const engagementRate: number = ((likeCount + dislikeCount + commentCount) / channel.details.subscriberCount);
    const reach: number = ((likeCount + dislikeCount + commentCount) / viewCount);

    return {
        'View Count': viewCount.toLocaleString(),
        'Like Count': likeCount.toLocaleString(),
        'Dislike Count': dislikeCount.toLocaleString(),
        'Comment Count': commentCount.toLocaleString(),
        'Engagement Rate': engagementRate.toFixed(2) + '%',
        'Reach': reach.toLocaleString()
    };
};

export function getDataPoints(channel: Channel, videos: Video[]): ChartDataPoints {
    return videos.reduce((acc, video: Video): ChartDataPoints => {
        const { viewCount, likeCount, dislikeCount, commentCount } = video.stats;
        const engagementRate: number = ((likeCount + dislikeCount + commentCount) / channel.details.subscriberCount);
        const reach: number = ((likeCount + dislikeCount + commentCount) / viewCount);


        return {
            viewCounts: acc.viewCounts.concat(viewCount),
            likeCounts: acc.likeCounts.concat(likeCount),
            dislikeCounts: acc.dislikeCounts.concat(dislikeCount),
            commentCounts: acc.commentCounts.concat(commentCount),
            engagementRates: acc.engagementRates.concat(engagementRate),
            reach: acc.reach.concat(reach)
        };
    }, {
        viewCounts: [],
        likeCounts: [],
        dislikeCounts: [],
        commentCounts: [],
        engagementRates: [],
        reach: []
    });
};