export interface UserSession {
    _id?: string;
    name?: string;
    lastName?: string;
    surName?: string;
    email?: string;
    phone?: string;
    role?: RoleData;
}

interface RoleData {
    name: string;
}