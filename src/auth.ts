import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export default class AuthClient {
  http: AxiosInstance;

  constructor(url: string) {
    this.http = axios.create({
      baseURL: url,
    });
  }

  public authenticate(credentials: LoginCredentials): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {
      this.http.post('/auth/', {
        ...credentials,
      }).then((res) => {
        resolve(AuthClient.createTokenResponseFromAxiosResponse(res));
      }).catch((err) => {
        reject(AuthClient.createErrorResponse(err));
      });
    });
  }

  public refresh(refreshToken: string): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {
      // TODO add auth header with auth token to identify the user
      this.http.post('/auth/refresh/', {
        refresh: refreshToken,
      }).then((res) => {
        resolve(AuthClient.createTokenResponseFromAxiosResponse(res));
      }).catch((err) => {
        reject(AuthClient.createErrorResponse(err));
      });
    });
  }

  private static createTokenResponseFromAxiosResponse(res: AxiosResponse): TokenResponse {
    const token: JwtPayload = jwtDecode(res.data.access);
    return {
      access: res.data.access,
      refresh: res.data.refresh,
      exp: token.exp,
      success: res.status === 200,
      code: res.status,
    };
  }

  private static createErrorResponse(err: AxiosError): TokenResponse {
    if (err.response) {
      return {
        success: false,
        code: err.response.status,
      };
    }
    return {
      success: false,
      code: 900,
    };
  }
}
