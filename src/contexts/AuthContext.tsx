import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
    id: string;
    name: string;
    email: string;
    fullName: string | null;
    avatar: string | null;
    roleId?: string;
    totalXP?: number;
}

interface AuthContextType {
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(() => {
        // Đoạn code này CHỈ CHẠY ĐÚNG 1 LẦN khi ứng dụng vừa khởi động
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
        } catch (error) {
            console.error("Lỗi đọc dữ liệu user:", error);
        }
        return null;
    });

    // Hàm tiện ích để đăng xuất ở bất kỳ đâu
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth phải được dùng bên trong AuthProvider');
    }
    return context;
};