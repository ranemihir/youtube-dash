import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChannelDetails, Video, VideoStats, Channel, OverallAnalytics } from "../types";
import * as youtubeService from './../services/youtube';
import * as analyticsService from './../services/analytics';
import { ChartDataPoints } from "../types/analytics";


export const Dashboard = (props: { authToken: string | null, getChannel: (channelId: string) => Channel; }) => {
    const { authToken } = props;

    const { channelId } = useParams();

    const [channel, setChannel] = useState<Channel>();
    const [videos, setVideos] = useState<Video[]>([]);
    const [overallAnalytics, setOverallAnalytics] = useState<OverallAnalytics>();
    const [chartDataPoints, setChartDataPoints] = useState<ChartDataPoints>();

    setChannel(props.getChannel(channelId));

    useEffect(() => {
        (async () => {
            const channelDetails: ChannelDetails = await youtubeService.getChannelDetails({ channelId, authToken });
            setChannel({
                ...channel,
                details: channelDetails
            });

            const videosData: Video[] = await youtubeService.getPlaylistItems({
                uploadsPlayListId: channelDetails.uploadsPlaylistId,
                authToken
            });

            for (let i = 0; i < videosData.length; i++) {
                const video = videosData[i];

                const videoStats: VideoStats = await youtubeService.getVideoStats({
                    videoId: video.id,
                    authToken
                });

                video.stats = videoStats;
            };

            setVideos(videosData);

            const overallAnalayticsData: OverallAnalytics = analyticsService.getOverallAnalytics(channel, videos);
            const chartDataPointsData: ChartDataPoints = analyticsService.getDataPoints(channel, videos);

            setOverallAnalytics(overallAnalayticsData);
            setChartDataPoints(chartDataPointsData);
        })();
    }, [channelId, authToken]);

    return (
        <div className="container-fluid">

        </div>
    );
};