interface IResponse<T> {
    data: T;
    message: string;
    page: PageType
    status_code?: number;
}

type PageType = {
    totalData: number,
    perPage: number,
    currentPage: number,
    totalPage: number
}