import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChannelDetails, Video, VideoStats } from "../types";
import * as youtubeService from './../services/youtube';


export const Dashboard = (props: { authToken: string | null; }) => {
    const { authToken } = props;
    const { channelId } = useParams();
    const [channelDetails, setChannelDetails] = useState<ChannelDetails>();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        (async () => {
            const channelDetails: ChannelDetails = await youtubeService.getChannelDetails({ channelId, authToken });
            setChannelDetails(channelDetails);

            const videos: Video[] = await youtubeService.getPlaylistItems({
                uploadsPlayListId: channelDetails.uploadsPlaylistId,
                authToken
            });

            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];

                const videoStats: VideoStats = await youtubeService.getVideoStats({
                    videoId: video.id,
                    authToken
                });

                video.stats = videoStats;
            };

            setVideos(videos);
        })();
    }, [channelId, authToken]);

    return (
        <>
            <div className='container-fluid bg-light border-bottom' style={{ height: 240 }}>
                <div className="row justify-content-center">
                    <div className="col-md-7 mt-5">
                        {JSON.stringify(channelDetails)}
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-12">
                        {JSON.stringify(videos)}
                    </div>
                </div>
            </div>
        </>
    );
};