export interface ApiResponse<T> {
    status: boolean;
    data: T;
    message: string;
  }
  
  export interface ApiResponseList<T> {
    status: boolean;
    data: T[];
    message: string;
  }
  
  export interface ErrorResponse {
    response: {
      data: {
        message: string;
      };
    };
  }
  