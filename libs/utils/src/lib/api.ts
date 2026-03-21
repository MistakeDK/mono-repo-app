import axios, { CreateAxiosDefaults } from 'axios';
type IConfigApi = CreateAxiosDefaults;
export const createConfigApi = (config: IConfigApi) => {
  return axios.create({ ...config });
};

export enum StatusCode {
  // Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // Redirect
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  // Client Error
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  // Server Error
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export interface IApiResponse<T = unknown> {
  status: StatusCode;
  message: string;
  data?: T;
}

export class ApiResponse<T = unknown> implements IApiResponse<T> {
  status: StatusCode;
  message: string;
  data?: T;

  constructor(status: StatusCode, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static ok<T>(message = 'Success', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.OK, message, data);
  }

  /**
   * Tạo created response (201 Created)
   */
  static created<T>(message = 'Created', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.CREATED, message, data);
  }

  /**
   * Tạo bad request response (400)
   */
  static badRequest<T>(message = 'Bad Request', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.BAD_REQUEST, message, data);
  }

  /**
   * Tạo unauthorized response (401)
   */
  static unauthorized<T>(message = 'Unauthorized', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.UNAUTHORIZED, message, data);
  }

  /**
   * Tạo forbidden response (403)
   */
  static forbidden<T>(message = 'Forbidden', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.FORBIDDEN, message, data);
  }

  /**
   * Tạo not found response (404)
   */
  static notFound<T>(message = 'Not Found', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.NOT_FOUND, message, data);
  }

  /**
   * Tạo conflict response (409)
   */
  static conflict<T>(message = 'Conflict', data?: T): ApiResponse<T> {
    return new ApiResponse(StatusCode.CONFLICT, message, data);
  }

  /**
   * Tạo internal server error response (500)
   */
  static internalServerError<T>(
    message = 'Internal Server Error',
    data?: T,
  ): ApiResponse<T> {
    return new ApiResponse(StatusCode.INTERNAL_SERVER_ERROR, message, data);
  }

  /**
   * Kiểm tra response có thành công không
   */
  isSuccess(): boolean {
    return this.status >= 200 && this.status < 300;
  }

  /**
   * Kiểm tra response có lỗi client không
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /**
   * Kiểm tra response có lỗi server không
   */
  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }
}
