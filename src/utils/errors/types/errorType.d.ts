export type ErrorType = {
  status: number;
  code: string;
};

export type ErrorValues = {
  [key: string]: ErrorType;
};
