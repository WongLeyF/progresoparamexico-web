export interface User {
    _id?: string;
    name?: string;
    lastName?: string;
    surName?: string;
    password?: string;
    email?: string;
    isActive?: boolean;
    createdAt?: Date;
    roleId?: string | any;
    phone?: string;
    onlyRegister?: boolean;
}