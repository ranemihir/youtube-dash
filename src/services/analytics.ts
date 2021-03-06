import { OverallAnalytics, Video, DataPoint, ChannelDetails } from "../types";

enum AnalyticsNames {
    viewCount = 'Views',
    likeCount = 'Likes',
    dislikeCount = 'Dislikes',
    commentCount = 'Comments',
    engagementRate = 'Engagement Rate',
    reach = 'Reach',
    totalViews = 'Total Views',
    uploadedVideos = 'Uploaded Videos'
};

export function getOverallAnalytics(channelDetails: ChannelDetails, videos: Video[]): OverallAnalytics[] {
    const overallAnalyticsObj: any = videos.reduce((acc, video: Video) => ({
        [AnalyticsNames.viewCount]: acc[AnalyticsNames.viewCount] + video.stats.viewCount,
        [AnalyticsNames.likeCount]: acc[AnalyticsNames.likeCount] + video.stats.likeCount,
        [AnalyticsNames.dislikeCount]: acc[AnalyticsNames.dislikeCount] + video.stats.dislikeCount,
        [AnalyticsNames.commentCount]: acc[AnalyticsNames.commentCount] + video.stats.commentCount,
        [AnalyticsNames.engagementRate]: 0,
        [AnalyticsNames.reach]: 0,
        [AnalyticsNames.totalViews]: 0,
        [AnalyticsNames.uploadedVideos]: 0
    }), {
        [AnalyticsNames.viewCount]: 0,
        [AnalyticsNames.likeCount]: 0,
        [AnalyticsNames.dislikeCount]: 0,
        [AnalyticsNames.commentCount]: 0,
        [AnalyticsNames.engagementRate]: 0,
        [AnalyticsNames.reach]: 0,
        [AnalyticsNames.totalViews]: 0,
        [AnalyticsNames.uploadedVideos]: 0
    });

    const viewCount: number = overallAnalyticsObj[AnalyticsNames.viewCount];
    const likeCount: number = overallAnalyticsObj[AnalyticsNames.likeCount];
    const dislikeCount: number = overallAnalyticsObj[AnalyticsNames.dislikeCount];
    const commentCount: number = overallAnalyticsObj[AnalyticsNames.commentCount];

    overallAnalyticsObj[AnalyticsNames.engagementRate] = ((likeCount + dislikeCount + commentCount) / channelDetails.subscriberCount);
    overallAnalyticsObj[AnalyticsNames.reach] = ((likeCount + dislikeCount + commentCount) / viewCount);
    overallAnalyticsObj[AnalyticsNames.totalViews] = channelDetails.totalViewCount;
    overallAnalyticsObj[AnalyticsNames.uploadedVideos] = channelDetails.videoCount;

    return Object.entries(overallAnalyticsObj).map((entry): OverallAnalytics => {
        const [name, value] = entry;

        return {
            name,
            value: value.toLocaleString() + ((name === AnalyticsNames.engagementRate && '%') || '')
        };
    });
};

export function getDataPoints(channelDetails: ChannelDetails, videos: Video[]): DataPoint[] {
    const dataPointObj = videos.reduce((acc, video: Video) => {
        const { viewCount, likeCount, dislikeCount, commentCount } = video.stats;
        const engagementRate: number = ((likeCount + dislikeCount + commentCount) / channelDetails.subscriberCount);
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

    return Object.entries(dataPointObj).map((entry: [string, number[]]): DataPoint => {
        const [name, data] = entry;

        return {
            name,
            data
        };
    });
};