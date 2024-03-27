import publicClient from "../client/public.client";

const genreEndpoints = {
  list: ({ mediaType }:any) => `${mediaType}/genres`
};

const genreApi = {
  getList: async ({ mediaType }:any) => {
    try {
      const response = await publicClient.get(genreEndpoints.list({ mediaType }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default genreApi;