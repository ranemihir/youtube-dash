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
            const channelData: Channel = props.getChannel(channelId);

            if (!channelData) {
                // TODO: fetch
                console.log('channelData not present');
            } else {
                setChannel(channelData);
            }

            const channelDetails: ChannelDetails = await youtubeService.getChannelDetails({ channelId, authToken });

            setChannel((c: Channel) => ({
                ...c,
                details: channelDetails
            }));

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

            const overallAnalayticsData: OverallAnalytics[] = analyticsService.getOverallAnalytics(channelDetails, videosData);
            const chartDataPoints: DataPoint[] = analyticsService.getDataPoints(channelDetails, videosData);

            setOverallAnalytics(overallAnalayticsData);
            setDataPoints(chartDataPoints);
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
                                overallAnalytics.map((overallAnalyticsData: OverallAnalytics) => {
                                    return (
                                        <div className="col-3 mb-4">
                                            <OverallAnalyticsCard key={overallAnalyticsData.name} overallAnalytics={overallAnalyticsData} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            <hr className="dropdown-divider mb-4 text-muted" />
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