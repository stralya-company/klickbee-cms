export interface AuthUser {
    id: string;
    email: string;
    password: string;
    roleId: string;
    createdAt: Date;
    role: {
        id: string;
        name: string;
    };
}

export const authConfig = {
    disableRegister: false,
    disableResetPassword: false,
    routes: {
        login: "/auth/login",
        register: "/auth/register",
        forgotPassword: "/auth/forgot",
    },
    hooks: {
        onLogin(user: AuthUser) {
            console.log("User connected:", user.email);
        },
    },
};