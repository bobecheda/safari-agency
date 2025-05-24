import { ApiError } from '@/types/api';
import { APP_CONFIG } from './constants';

export class ApiErrorHandler {
  static handle(error: unknown): ApiError {
    if (error && typeof error === 'object' && 'response' in error) {
      const response = (error as any).response;
      if (response?.data?.message) {
        return {
          message: response.data.message,
          status: response.status
        };
      }
      return {
        message: `Error ${response?.status || 500}: ${response?.statusText || APP_CONFIG.DEFAULT_ERROR_MESSAGE}`,
        status: response?.status || 500
      };
    }
    
    if (error instanceof Error) {
      return {
        message: error.message,
        status: 500
      };
    }

    return {
      message: APP_CONFIG.DEFAULT_ERROR_MESSAGE,
      status: 500
    };
  }

  static isUnauthorized(error: unknown): boolean {
    if (error && typeof error === 'object' && 'response' in error) {
      return (error as any).response?.status === 401;
    }
    return false;
  }

  static isForbidden(error: unknown): boolean {
    if (error && typeof error === 'object' && 'response' in error) {
      return (error as any).response?.status === 403;
    }
    return false;
  }
}