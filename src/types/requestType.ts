interface StudentGetRequest {
  search: string;
  page: number;
  limit: number;
}
interface StudentAddRequest {
  name: string;
  email: string;
  phoneNumber: string;
  schoolId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any;
}
interface StudentDeleteRequest {
  id: string;
}

export type { StudentAddRequest, StudentGetRequest, StudentDeleteRequest };
