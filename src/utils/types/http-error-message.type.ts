type HTTPErrorFormat = {
  status: number;
  error: string;
  message: string;
};

export type HTTPErrorMessage = Record<string, HTTPErrorFormat>;
