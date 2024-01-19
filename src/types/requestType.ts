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
  media?: File | null;
}
interface StudentDeleteRequest {
  id: string;
}

export type { StudentAddRequest, StudentGetRequest, StudentDeleteRequest };
