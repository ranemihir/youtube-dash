import { Channel, ChannelDetails, Video, VideoStats } from "../types";

const YOUTUBE_URLS = {
	search: 'https://www.googleapis.com/youtube/v3/search',
	channel: 'https://youtube.googleapis.com/youtube/v3/channels',
	playlist: 'https://youtube.googleapis.com/youtube/v3/playlistItems',
	video: 'https://youtube.googleapis.com/youtube/v3/videos'
};

const topics: { [key: string]: string; } = {
	"/m/04rlf": "Music",
	"/m/05fw6t": "Children's music",
	"/m/02mscn": "Christian music",
	"/m/0ggq0m": "Classical music",
	"/m/01lyv": "Country",
	"/m/02lkt": "Electronic music",
	"/m/0glt670": "Hip hop music",
	"/m/05rwpb": "Independent music",
	"/m/03_d0": "Jazz",
	"/m/028sqc": "Music of Asia",
	"/m/0g293": "Music of Latin America",
	"/m/064t9": "Pop music",
	"/m/06cqb": "Reggae",
	"/m/06j6l": "Rhythm and blues",
	"/m/06by7": "Rock music",
	"/m/0gywn": "Soul music",
	"/m/0bzvm2": "Gaming",
	"/m/025zzc": "Action game",
	"/m/02ntfj": "Action-adventure game",
	"/m/0b1vjn": "Casual game",
	"/m/02hygl": "Music video game",
	"/m/04q1x3q": "Puzzle video game",
	"/m/01sjng": "Racing video game",
	"/m/0403l3g": "Role-playing video game",
	"/m/021bp2": "Simulation video game",
	"/m/022dc6": "Sports game",
	"/m/03hf_rm": "Strategy video game",
	"/m/06ntj": "Sports",
	"/m/0jm_": "American football",
	"/m/018jz": "Baseball",
	"/m/018w8": "Basketball",
	"/m/01cgz": "Boxing",
	"/m/09xp_": "Cricket",
	"/m/02vx4": "Football",
	"/m/037hz": "Golf",
	"/m/03tmr": "Ice hockey",
	"/m/01h7lh": "Mixed martial arts",
	"/m/0410tth": "Motorsport",
	"/m/066wd": "Professional wrestling",
	"/m/07bs0": "Tennis",
	"/m/07_53": "Volleyball",
	"/m/02jjt": "Entertainment",
	"/m/095bb": "Animated cartoon",
	"/m/09kqc": "Humor",
	"/m/02vxn": "Movies",
	"/m/05qjc": "Performing arts",
	"/m/019_rr": "Lifestyle",
	"/m/032tl": "Fashion",
	"/m/027x7n": "Fitness",
	"/m/02wbm": "Food",
	"/m/0kt51": "Health",
	"/m/03glg": "Hobby",
	"/m/068hy": "Pets",
	"/m/041xxh": "Physical attractiveness [Beauty]",
	"/m/07c1v": "Technology",
	"/m/07bxq": "Tourism",
	"/m/07yv9": "Vehicles",
	"/m/01k8wb": "Knowledge",
	"/m/098wr": "Society"
};

export async function searchChannels(params: { query: string, maxResults: number, authToken: string; }): Promise<Channel[]> {
	const url = new URL(YOUTUBE_URLS.search);

	url.searchParams.append('part', 'snippet');
	url.searchParams.append('maxResults', params.maxResults.toString());
	url.searchParams.append('q', params.query);
	url.searchParams.append('type', 'channel');

	const headers = new Headers();
	headers.set('Accept', 'application/json');
	headers.set('Authorization', 'Bearer ' + params.authToken);

	const res: any = await fetch(url.toString(), { method: 'GET', headers });
	const data: any = await res.json();

	if (data) {
		const channels: Channel[] = await data.items.map((item: any): Channel => {
			const { channelId, channelTitle, publishedAt, description, thumbnails } = item.snippet;

			return {
				id: channelId,
				name: channelTitle,
				description,
				publishedAt,
				thumbnailUrl: thumbnails.default.url
			};
		});

		return channels;
	} else {
		throw new Error('Error occurred while fetching data');
	}
};

export async function getChannelDetails(params: { channelId: string, authToken: string; }): Promise<ChannelDetails> {
	const url = new URL(YOUTUBE_URLS.channel);

	url.searchParams.append('part', 'contentDetails');
	url.searchParams.append('part', 'topicDetails');
	url.searchParams.append('part', 'statistics');

	url.searchParams.append('id', params.channelId);

	const headers = new Headers();
	headers.set('Accept', 'application/json');
	headers.set('Authorization', 'Bearer ' + params.authToken);

	const res: any = await fetch(url.toString(), { method: 'GET', headers });
	const data: any = await res.json();

	if (data) {
		const { contentDetails, statistics, topicDetails } = data.items[0];
		const { viewCount, subscriberCount, videoCount } = statistics;

		return {
			tags: topicDetails.topicIds.map((topicId: string): string => topics[topicId]),
			uploadsPlaylistId: contentDetails.relatedPlaylists.uploads,
			totalViewCount: Number(viewCount),
			subscriberCount: Number(subscriberCount),
			videoCount: Number(videoCount)
		};
	} else {
		throw new Error('Error occurred while fetching data');
	}
};

export async function getPlaylistItems(params: { uploadsPlayListId: string, authToken: string; }): Promise<Video[]> {
	const url = new URL(YOUTUBE_URLS.playlist);

	url.searchParams.append('part', 'snippet');
	url.searchParams.append('part', 'id');
	url.searchParams.append('maxResults', '5');
	url.searchParams.append('playlistId', params.uploadsPlayListId);

	const headers = new Headers();
	headers.set('Accept', 'application/json');
	headers.set('Authorization', 'Bearer ' + params.authToken);

	const res: any = await fetch(url.toString(), { method: 'GET', headers });
	const data: any = await res.json();

	if (data) {
		return data.items.map((item: any): Video => {
			const { snippet } = item;

			return {
				id: snippet.resourceId.videoId,
				title: snippet.title,
				publishedAt: snippet.publishedAt,
				thumbnailUrl: snippet.thumbnails.default.url
			};
		});
	} else {
		throw new Error('Error occurred while fetching data');
	}
};

export async function getVideoStats(params: { videoId: string, authToken: string; }): Promise<VideoStats> {
	const url = new URL(YOUTUBE_URLS.video);

	url.searchParams.append('part', 'statistics');
	url.searchParams.append('id', params.videoId);

	const headers = new Headers();
	headers.set('Accept', 'application/json');
	headers.set('Authorization', 'Bearer ' + params.authToken);

	const res: any = await fetch(url.toString(), { method: 'GET', headers });
	const data: any = await res.json();

	if (data) {
		const { viewCount, likeCount, dislikeCount, commentCount } = data.items[0].statistics;

		return {
			viewCount: Number(viewCount),
			likeCount: Number(likeCount),
			dislikeCount: Number(dislikeCount),
			commentCount: Number(commentCount)
		};
	} else {
		throw new Error('Error occurred while fetching data');
	}
};