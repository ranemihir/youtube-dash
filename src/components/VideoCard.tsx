import { Video } from './../types';

export const VideoCard = (props: { video: Video; }) => {
    return <div>{props.video}</div>;
};