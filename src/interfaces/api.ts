interface UserMockProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
}

interface UserMockResponse {
  data: UserMockProps[];
}

export type { UserMockProps, UserMockResponse };
