import { coreApi } from '../api/coreApi';
import type {
  LeaderboardGetRequest,
  LeaderboardSuccessResponse,
  ScoreGetRequest,
  ScoreSuccessResponse,
} from '../types';

export const scoreApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getScore: builder.mutation<ScoreSuccessResponse, ScoreGetRequest>({
      query: (data) => ({
        url: '/score',
        method: 'POST',
        body: data,
      }),
    }),
    getLeaderboard: builder.mutation<
      LeaderboardSuccessResponse,
      LeaderboardGetRequest
    >({
      query: (data) => ({
        url: '/score/leaderboard',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetLeaderboardMutation, useGetScoreMutation } = scoreApi;
