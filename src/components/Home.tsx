import { Channel } from "../types";
import * as youtubeService from './../services/youtube';
import { ChannelCard } from "./ChannelCard";


export const Home = (props: { authToken: string | null, searchState: any; }) => {
    const { query, setQuery, channelResults, setChannelResults } = props.searchState;

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const channelsData: Channel[] = await youtubeService.searchChannels({
            query,
            maxResults: 20,
            authToken: props.authToken
        });

        setChannelResults(channelsData);
    };

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    };

    return (
        <>
            <div className='container-fluid bg-light border-bottom' style={{ height: 240 }}>
                <div className="row justify-content-center">
                    <div className="col-md-7 mt-5">
                        <form className="d-flex mt-5 mx-3" onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={query} className="form-control me-2 rounded-0 border border-2 border-secondary" type="search" placeholder="CHANNEL NAME" aria-label="Search" style={{ fontWeight: 500, letterSpacing: 1 }} />
                            <button className="btn btn-outline-danger rounded-0 border border-danger border-2" type="submit" style={{ fontWeight: 500, letterSpacing: 1 }}>SEARCH</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-12">
                        <div className="my-5">
                            {
                                channelResults.map((channel: Channel) => (
                                    <ChannelCard key={channel.id} channel={channel} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};