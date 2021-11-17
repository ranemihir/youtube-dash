import { useState } from "react";
import { Channel } from "../types";
import * as youtubeService from './../services/youtube';
import { ChannelCard } from "./ChannelCard";

export const Home = (props: { authToken: string; }) => {
    const [query, setQuery] = useState('');
    const [channels, setChannels] = useState([]);

    const handleSubmit = async (event: any) => {
        const channelsData: Channel[] = await youtubeService.searchChannels({
            query,
            maxResults: 20,
            authToken: props.authToken
        });

        setChannels(channelsData);

        event.preventDefault();
    };

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    };

    return (
        <div className="row">
            <div className="col-12">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={query} className="form-control me-2" type="search" placeholder="Channel Name" aria-label="Search" />
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
            </div>
            <div className="col-12">
                {
                    channels.map((channel: Channel) => (
                        <ChannelCard channel={channel} />
                    ))
                }
            </div>
        </div>
    );
};