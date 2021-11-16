import { Channel } from './../types';

export const ChannelCard = (props: { channel: Channel; }) => {
    return <div>{props.channel}</div>;
};