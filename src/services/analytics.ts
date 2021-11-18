import { Channel, OverallAnalytics, Video, DataPoint } from "../types";

enum AnalyticsNames {
    viewCount = 'Views',
    likeCount = 'Likes',
    dislikeCount = 'Dislikes',
    commentCount = 'Comments',
    engagementRate = 'Engagement Rate',
    reach = 'Reach'
};

export function getOverallAnalytics(channel: Channel, videos: Video[]): OverallAnalytics[] {
    const overallAnalyticsObj: any = videos.reduce((acc, video: Video) => ({
        ...overallAnalyticsObj,
        [AnalyticsNames.viewCount]: acc[AnalyticsNames.viewCount] + video.stats.viewCount,
        [AnalyticsNames.likeCount]: acc[AnalyticsNames.likeCount] + video.stats.likeCount,
        [AnalyticsNames.dislikeCount]: acc[AnalyticsNames.dislikeCount] + video.stats.dislikeCount,
        [AnalyticsNames.commentCount]: acc[AnalyticsNames.commentCount] + video.stats.commentCount
    }), {
        [AnalyticsNames.viewCount]: 0,
        [AnalyticsNames.likeCount]: 0,
        [AnalyticsNames.dislikeCount]: 0,
        [AnalyticsNames.commentCount]: 0,
        [AnalyticsNames.engagementRate]: 0,
        [AnalyticsNames.reach]: 0
    });

    const viewCount: number = overallAnalyticsObj[AnalyticsNames.viewCount];
    const likeCount: number = overallAnalyticsObj[AnalyticsNames.likeCount];
    const dislikeCount: number = overallAnalyticsObj[AnalyticsNames.dislikeCount];
    const commentCount: number = overallAnalyticsObj[AnalyticsNames.commentCount];

    overallAnalyticsObj[AnalyticsNames.engagementRate] = ((likeCount + dislikeCount + commentCount) / channel.details.subscriberCount);
    overallAnalyticsObj[AnalyticsNames.reach] = ((likeCount + dislikeCount + commentCount) / viewCount);

    return Object.entries(overallAnalyticsObj).map((entry): OverallAnalytics => {
        const [name, value] = entry;

        return {
            name,
            value: value.toLocaleString()
        };
    });
};

export function getDataPoints(channel: Channel, videos: Video[]): DataPoint[] {
    const dataPointObj: any = videos.reduce((acc, video: Video) => {
        const { viewCount, likeCount, dislikeCount, commentCount } = video.stats;
        const engagementRate: number = ((likeCount + dislikeCount + commentCount) / channel.details.subscriberCount);
        const reach: number = ((likeCount + dislikeCount + commentCount) / viewCount);

        return {
            [AnalyticsNames.viewCount]: acc[AnalyticsNames.viewCount].concat(viewCount),
            [AnalyticsNames.likeCount]: acc[AnalyticsNames.likeCount].concat(likeCount),
            [AnalyticsNames.dislikeCount]: acc[AnalyticsNames.dislikeCount].concat(dislikeCount),
            [AnalyticsNames.commentCount]: acc[AnalyticsNames.commentCount].concat(commentCount),
            [AnalyticsNames.engagementRate]: acc[AnalyticsNames.engagementRate].concat(engagementRate),
            [AnalyticsNames.reach]: acc[AnalyticsNames.reach].concat(reach)
        };
    }, {
        [AnalyticsNames.viewCount]: [],
        [AnalyticsNames.likeCount]: [],
        [AnalyticsNames.dislikeCount]: [],
        [AnalyticsNames.commentCount]: [],
        [AnalyticsNames.engagementRate]: [],
        [AnalyticsNames.reach]: []
    });

    return Object.entries(dataPointObj).map((entry): DataPoint => {
        const [name, data] = entry;

        return {
            name,
            data
        };
    });
};