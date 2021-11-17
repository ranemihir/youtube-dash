import { useState } from "react";
import { Channel } from "../types";
import * as youtubeService from './../services/youtube';
import { ChannelCard } from "./ChannelCard";


export const Home = (props: { authToken: string | null; }) => {
    const [query, setQuery] = useState('');
    const [channels, setChannels] = useState([]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const channelsData: Channel[] = await youtubeService.searchChannels({
            query,
            maxResults: 20,
            authToken: props.authToken
        });

        setChannels(channelsData);
    };

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    };

    return (
        <div className="row mt-5 justify-content-center">
            <div className="col-md-8 ">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={query} className="form-control me-2 rounded-0 bg-light" type="search" placeholder="Channel Name" aria-label="Search" />
                    <button className="btn btn-outline-danger rounded-0" type="submit">Search</button>
                </form>
            </div>
            <div className="col-md-8">
                <div className="my-5">
                    {
                        channels.map((channel: Channel) => (
                            <ChannelCard key={channel.id} channel={channel} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};