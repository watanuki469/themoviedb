// import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }:any) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }:any) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }:any) => `${mediaType}/search?query=${query}&page=${page}`
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }:any) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getDetail: async ({ mediaType, mediaId }:any) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  search: async ({ mediaType, query, page }:any) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) { return { err }; }
  }
};

export default mediaApi;