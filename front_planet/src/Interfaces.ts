export interface User {
    id?: number;
    avatar: File | null;
    email: string;
    first_name: string;
    last_name: string;
};

export interface Token {
    user_id: number;
    exp: number;
    is_staff: boolean;
    email: string;
    first_name: string;
    last_name: string;
    avatar: File | null;
};