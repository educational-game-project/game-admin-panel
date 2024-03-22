import { coreApi } from "../api/coreApi";
import type { DashboardSuccessResponse } from "../types";

export const dashboardApi = coreApi.injectEndpoints({
	endpoints: (builder) => ({
		getDashboard: builder.query<DashboardSuccessResponse, void>({
			query: () => "/dashboard",
			providesTags: ["Dashboard"],
		}),
	}),
});

export const { useGetDashboardQuery } = dashboardApi;
