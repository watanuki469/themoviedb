import publicClient from "../client/public.client";

const personEndpoints = {
  detail: ({ personId }:any) => `person/${personId}`,
  medias: ({ personId }:any) => `person/${personId}/medias`
};

const personApi = {
  detail: async ({ personId }:any) => {
    try {
      const response = await publicClient.get(personEndpoints.detail({ personId }));

      return { response };
    } catch (err) { return { err }; }
  },
  medias: async ({ personId }:any) => {
    try {
      const response = await publicClient.get(personEndpoints.medias({ personId }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default personApi;