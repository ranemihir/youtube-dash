import { Channel } from './../types';

export const ChannelCard = (props: { channel: Channel; }) => {
    return (
        <div className='card'>
            <div className='row g-0'>
                <div className='col-md-4'>
                    <img className='img-thumbnail rounded' src={props.channel.thumbnailUrl} alt={props.channel.name + ' thumbnail'} />
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.channel.name}</h5>
                        <p className='card-text'>{props.channel.description}</p>
                        <p className='card-text'>
                            <small className='text-muted'>{props.channel.publishedAt}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};