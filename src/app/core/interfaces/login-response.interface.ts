import { UserSession } from './user-session.interface';

export interface LoginResponse {

    access_token: string;
    user: UserSession;

}
