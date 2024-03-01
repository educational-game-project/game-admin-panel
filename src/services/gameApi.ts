import { coreApi } from '../api/coreApi';

import type {
  DataTableGetRequest,
  GameIdRequest,
  GameListSuccessResponse,
  GameSuccessResponse,
  SuccessResponse,
} from '../types';

export const gameApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    getGame: builder.mutation<GameListSuccessResponse, DataTableGetRequest>({
      query: (data) => ({
        url: '/games/find',
        method: 'POST',
        body: data,
      }),
    }),
    getGameById: builder.mutation<GameSuccessResponse, GameIdRequest>({
      query: (id) => ({
        url: '/games/detail',
        method: 'POST',
        body: id,
      }),
    }),
    defineGame: builder.mutation({
      query: (data) => {
        const formDefineGame = new FormData();
        formDefineGame.append('name', data.name);
        formDefineGame.append('author', data.author);
        formDefineGame.append('description', data.description);
        formDefineGame.append('category', data.category);
        formDefineGame.append('maxLevel', data.maxLevel);
        formDefineGame.append('maxRetry', data.maxRetry);
        formDefineGame.append('maxTime', data.maxTime);
        if (data.media && data.media.length > 0) {
          data.media.forEach((image: File, index: number) => {
            formDefineGame.append(`media[${index}]`, image);
          });
        }
        return {
          url: '/games',
          method: 'POST',
          body: formDefineGame,
          formData: true,
        };
      },
      invalidatesTags: ['Game', 'Dashboard'],
    }),
    updateGame: builder.mutation({
      query: (data) => {
        const formEditGame = new FormData();
        formEditGame.append('id', data.id);
        formEditGame.append('name', data.name);
        formEditGame.append('author', data.author);
        formEditGame.append('description', data.description);
        formEditGame.append('category', data.category);
        formEditGame.append('maxLevel', data.maxLevel);
        formEditGame.append('maxRetry', data.maxRetry);
        formEditGame.append('maxTime', data.maxTime);
        if (data.media && data.media.length > 0) {
          data.media.forEach((image: File, index: number) => {
            formEditGame.append(`media[${index}]`, image);
          });
        }
        return {
          url: '/games',
          method: 'PUT',
          body: formEditGame,
          formData: true,
        };
      },
      invalidatesTags: ['Game', 'Dashboard'],
    }),
    deleteGame: builder.mutation<SuccessResponse, GameIdRequest>({
      query: (id) => ({
        url: '/games',
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Game', 'Dashboard'],
    }),
  }),
});

export const {
  useDefineGameMutation,
  useDeleteGameMutation,
  useGetGameByIdMutation,
  useGetGameMutation,
  useUpdateGameMutation,
} = gameApi;
