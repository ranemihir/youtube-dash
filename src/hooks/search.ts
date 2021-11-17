import { useState } from 'react';

export function useSearch() {
    const [query, setQuery] = useState('');
    const [channelResults, setChannelResults] = useState([]);

    return {
        query,
        setQuery,
        channelResults,
        setChannelResults
    };
}