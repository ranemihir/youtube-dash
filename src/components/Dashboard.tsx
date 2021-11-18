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
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {
                        (channel && channel != null && channel.details) &&
                        <div className="card">
                            <img src={channel.thumbnailUrl} className="card-img-top rounded-circle p-4" alt={channel.name + ' thumbnail'} />
                            <div className="card-body">
                                <h3 className="card-title">{channel.name}</h3>
                                <p className="card-text">
                                    Subscribers <strong>{channel.details.subscriberCount.toLocaleString()}</strong>
                                </p>
                                <p className="card-text">
                                    Total Views <strong>{channel.details.totalViewCount.toLocaleString()}</strong>
                                </p>
                                <p className="card-text">
                                    Uploaded Videos <strong>{channel.details.videoCount.toLocaleString()}</strong>
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-9">
                    {
                        (overallAnalytics && overallAnalytics != null) &&
                        <div className="row">
                            {
                                (overallAnalytics && overallAnalytics != null) &&
                                overallAnalytics.map((overallAnalyticsData: OverallAnalytics) => {
                                    return (
                                        <div className="col-3">
                                            <OverallAnalyticsCard key={overallAnalyticsData.name} overallAnalytics={overallAnalyticsData} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="row">
                {
                    (dataPoints && dataPoints != null) &&
                    dataPoints.map((chartDataPoint: DataPoint) => {
                        return (
                            <div className="col-4">
                                <ChartCard key={chartDataPoint.name} dataPoint={chartDataPoint} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};