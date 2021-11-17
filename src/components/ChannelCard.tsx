import { Link } from 'react-router-dom';
import { Channel } from './../types';

export const ChannelCard = (props: { channel: Channel; }) => {
    return (
        <div className='card bg-light my-3 rounded-0 shadow-sm'>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <img className='img-thumbnail rounded-circle m-3 shadow-sm' src={props.channel.thumbnailUrl} alt={props.channel.name + ' thumbnail'} />
                <div className='card-body pe-4'>
                    <Link className='text-black text-decoration-none' to={'/' + props.channel.id}>
                        <h5 className='card-title'>{props.channel.name}</h5>
                    </Link>
                    <p className='card-text'>{props.channel.description}</p>
                    <p className='card-text'>
                        <small className='text-muted'>{new Date(props.channel.publishedAt).toLocaleDateString(undefined, {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</small>
                    </p>
                </div>
            </div>
        </div>
    );
};