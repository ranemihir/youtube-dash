import { Video } from './../types';

export const VideoCard = (props: { video: Video; }) => {
    return (
        <div className='card'>
            <img src={props.video.thumbnailUrl} className='card-img-top' alt={props.video.title + ' thumbnail'} />
            <div className='card-body'>
                <div className='card-title'>{props.video.title}</div>
                <div className='card-text'>
                    <small className='text-muted'>{props.video.publishedAt}</small>
                </div>
            </div>
        </div>
    );
};