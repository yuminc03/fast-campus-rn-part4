import {useCallback, useState} from 'react';
import axios from 'axios';

import {TypeListItem} from './TypeListItem';

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
});

const API_KEY = 'AIzaSyBP75aRJgVZtOWG1ft2T431PHjPhRJktwo';

export const useYoutubeData = () => {
  const [data, setData] = useState<TypeListItem[]>();

  const loadData = useCallback(async () => {
    try {
      const videoResults = await axiosInstance.get<{
        kind: 'youtube#videoListResponse';
        etag: string;
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: {
          totalResults: number;
          resultsPerPage: number;
        };
        items: {
          kind: 'youtube#video';
          etag: string;
          id: string;
          snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
              [key: string]: {
                url: string;
                width: number;
                height: number;
              };
            };
            channelTitle: string;
            tags: string[];
            categoryId: string;
          };
          contentDetails: {
            duration: string;
            dimension: string;
            definition: string;
            caption: string;
            licensedContent: boolean;
            regionRestriction: {
              allowed: [string];
              blocked: [string];
            };
            contentRating: {
              mpaaRating: string;
              tvpgRating: string;
              bbfcRating: string;
              chvrsRating: string;
              eirinRating: string;
              cbfcRating: string;
              fmocRating: string;
              icaaRating: string;
              acbRating: string;
              oflcRating: string;
              fskRating: string;
              kmrbRating: string;
              djctqRating: string;
              russiaRating: string;
              rtcRating: string;
              ytRating: string;
            };
          };
          statistics: {
            viewCount: number;
            likeCount: number;
            dislikeCount: number;
            favoriteCount: number;
            commentCount: number;
          };
        }[];
      }>('/videos', {
        params: {
          key: API_KEY,
          part: 'snippet, contentDetails, statistics',
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      });

      const videoData = videoResults.data;
      setData(
        videoData.items.map(item => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: item.statistics.viewCount,
          channelTitle: item.snippet.channelTitle,
        })),
      );
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return {
    data,
    loadData,
  };
};
