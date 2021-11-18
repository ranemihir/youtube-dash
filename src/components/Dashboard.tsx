import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChannelDetails, Video, VideoStats, Channel, OverallAnalytics, DataPoint } from "../types";
import * as youtubeService from './../services/youtube';
import * as analyticsService from './../services/analytics';
import { OverallAnalyticsCard } from "./OverallAnalyticsCard";
import { ChartCard } from "./ChartCard";


export const Dashboard = (props: { authToken: string | null, getChannel: (channelId: string) => Channel; }) => {
    const { authToken } = props;

    const { channelId } = useParams();

    const [channel, setChannel] = useState<Channel>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [videos, setVideos] = useState<Video[]>([]);
    const [overallAnalytics, setOverallAnalytics] = useState<OverallAnalytics[]>();
    const [dataPoints, setDataPoints] = useState<DataPoint[]>();

    useEffect(() => {
        (async () => {
            try {
                let channelData: Channel = props.getChannel(channelId);

                if (!channelData) {
                    channelData = await youtubeService.getChannelDetails({ channelId, authToken, fetchChannel: true }) as Channel;
                } else {
                    channelData.details = await youtubeService.getChannelDetails({ channelId, authToken, fetchChannel: false }) as ChannelDetails;
                }

                setChannel(channelData);

                const videosData: Video[] = await youtubeService.getPlaylistItems({
                    uploadsPlayListId: channelData.details.uploadsPlaylistId,
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

                const overallAnalayticsData: OverallAnalytics[] = analyticsService.getOverallAnalytics(channel.details, videosData);
                const chartDataPoints: DataPoint[] = analyticsService.getDataPoints(channel.details, videosData);

                setOverallAnalytics(overallAnalayticsData);
                setDataPoints(chartDataPoints);
            } catch (err) {
                console.error(err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <div className="col-4">
                    {
                        (channel && channel != null && channel.details) &&
                        <div className="card rounded-0 shadow-sm d-flex flex-row align-items-center">
                            <img src={channel.thumbnailUrl} className="img-thumbnail rounded-circle m-4" alt={channel.name + ' thumbnail'} style={{
                                width: 148,
                                height: 148
                            }} />
                            <div className="card-body">
                                <h2 className="card-title fw-bolder">{channel.name}</h2>
                                <p className="card-text">
                                    <i className="bi bi-people-fill me-2"></i>
                                    <strong>{channel.details.subscriberCount.toLocaleString()}</strong>
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-8">
                    {
                        (overallAnalytics && overallAnalytics != null) &&
                        <div className="row">
                            {
                                (overallAnalytics && overallAnalytics != null) &&
                                overallAnalytics.map((overallAnalyticsData: OverallAnalytics, i: number) => {

                                    return (
                                        <div className="col-3 mb-4">
                                            <OverallAnalyticsCard key={overallAnalyticsData.name} overallAnalytics={{
                                                ...overallAnalyticsData,
                                                name: (((i < 4) && 'avg. ') || '') + overallAnalyticsData.name
                                            }} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            {
                (channel && channel != null && channel.details) &&
                <hr className="dropdown-divider mb-4 text-muted" />
            }
            <div className="row mb-4">
                {
                    (dataPoints && dataPoints != null) &&
                    dataPoints.map((chartDataPoint: DataPoint) => {
                        return (
                            <div className="col-4 mb-4">
                                <ChartCard key={chartDataPoint.name} dataPoint={chartDataPoint} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};