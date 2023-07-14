export interface Student {
  name: string;
  email: string;
  phoneNumber: string;
  profileImg: string;
  math: {
    tests: Test[];
  };
  biology: {
    tests: Test[];
  };
  physics: {
    tests: Test[];
  };
  chemistry: {
    tests: Test[];
  };
}

export interface Test {
  id: number;
  performance: number;
  time: number;
  accuracy: number;
}
