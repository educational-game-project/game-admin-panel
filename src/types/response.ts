interface IResponse<T> {
    data: T,
    message: string,
    page: PageType
}

type PageType = {
    totalData: number,
    perPage: number,
    currentPage: number,
    totalPage: number
}