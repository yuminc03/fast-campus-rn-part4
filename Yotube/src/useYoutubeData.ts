import {useCallback, useState} from 'react';
import axios from 'axios';

import {TypeListItem} from './TypeListItem';

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

const API_KEY = 'AIzaSyBP75aRJgVZtOWG1ft2T431PHjPhRJktwo';

export const useYoutubeData = () => {
  const [data] = useState<TypeListItem[]>();

  const loadData = useCallback(async () => {
    try {
      const videoResults = await axiosInstance.get<{
        // {
        //   "kind": "youtube#videoListResponse",
        // "etag": string,
        // "nextPageToken": string,
        // "prevPageToken": string,
        // "pageInfo": {
        //   "totalResults": number,
        //   "resultsPerPage": number
        // },
        // "items": [
          
        // ]
        // }[];
      }>('/videos', {
        params: {
          key: API_KEY,
          part: 'snippet, contentDetails, statistics',
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      });
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return {
    data,
    loadData,
  };
};
