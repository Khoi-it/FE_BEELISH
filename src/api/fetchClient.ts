export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    // Sửa lỗi ESLint: Dùng const vì biến này không bị gán lại
    const accessToken = localStorage.getItem('accessToken');

    // Khởi tạo headers với kiểu Record để TypeScript không phàn nàn
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Nếu lúc gọi hàm có truyền thêm headers (ví dụ multipart/form-data), thì gộp nó vào
    if (options.headers) {
        // Ép kiểu options.headers về any để clone các thuộc tính dễ dàng hơn
        Object.assign(headers, options.headers as any);
    }

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Thực hiện request lần 1
    let response = await fetch(url, { ...options, headers });

    // Kiểm tra lỗi 401
    if (response.status === 401) {
        console.log("Access Token hết hạn! Đang gọi Refresh Token...");

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            forceLogout();
            throw new Error("Không có Refresh Token, vui lòng đăng nhập lại");
        }

        try {
            // Gọi API refresh
            const refreshResponse = await fetch('http://localhost:8080/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: refreshToken })
            });

            if (!refreshResponse.ok) {
                throw new Error("Refresh Token không hợp lệ hoặc đã hết hạn");
            }

            const refreshData = await refreshResponse.json();
            const newAccessToken = refreshData.data.accessToken;
            const newRefreshToken = refreshData.data.refreshToken;

            localStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
            }

            console.log("Đã có Token mới, thử gọi lại request ban đầu...");
            // Cập nhật lại headers với token mới
            headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Thực hiện request lần 2 và gán lại cho biến response
            response = await fetch(url, { ...options, headers });

        } catch (error) {
            console.error("Lỗi khi refresh token:", error);
            forceLogout();
            throw error; // Bắn lỗi ra cho UI xử lý
        }
    }

    return response;
};

// Hàm hỗ trợ đăng xuất
const forceLogout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
};