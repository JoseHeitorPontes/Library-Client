import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthContextProps = {
    currentUser: User;
    setCurrentUser: (user: User) => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({
    children,
}: AuthProviderProps)
{
    const [currentUser, setCurrentUser] = useState<User>({} as User);

    async function getCurrentUser() {
        try {
            const { data} = await api.get("/me");

            setCurrentUser(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
}