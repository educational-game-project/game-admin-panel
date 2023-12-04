interface UserMockProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
}

interface MoviewMockProps {
  id: string;
  name: string;
  genre: string;
  rating: number;
}

interface ScoreProps {
  id: string;
  name: string;
  score: number;
}

interface StudentProps {
  _id: string;
  name: string;
  role: string;
  images: {
    _id: string;
    originalname: string;
    filename: string;
    fileLink: string;
    mimeType: string;
    size: number;
    isDefault: boolean;
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
  };
  email: string;
  phoneNumber: string;
  password: string;
  deletedAt: string;
  school: {
    _id: string;
    name: string;
    address: string;
    images: string;
    adminsCount: number;
    studentsCount: number;
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
    createdAtString: string;
    updatedAtString: string;
  };
  createdAt: string;
  createdAtString: string;
  updatedAtString: string;
}

interface ScoreResponse {
  data: ScoreProps[];
}

interface StudentResponse {
  data: StudentProps[];
}

interface UserMockResponse {
  data: UserMockProps[];
}

interface MoviewMockResponse {
  data: MoviewMockProps[];
}

export type {
  UserMockProps,
  UserMockResponse,
  MoviewMockProps,
  MoviewMockResponse,
  ScoreProps,
  ScoreResponse,
  StudentProps,
  StudentResponse,
};
