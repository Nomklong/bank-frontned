export type UserType = {
    data: {
        token: string;
        email: string;
        first_name: string;
        last_name: string;
    }
    status: {
        code: number;
        message: string;
    }
    error?: {
        message: string;
        error: [];
    }
}
