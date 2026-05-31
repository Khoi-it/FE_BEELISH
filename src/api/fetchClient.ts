export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const accessToken = localStorage.getItem('accessToken');

    // 1. Khởi tạo object headers trống
    const headers: Record<string, string> = {};

    // 2. Chỉ thêm 'application/json' nếu body KHÔNG phải là FormData
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // 3. Nếu lúc gọi hàm có truyền thêm headers thì gộp nó vào
    if (options.headers) {
        Object.assign(headers, options.headers as any);
    }

    // 4. Kiểm tra an toàn: Nếu là FormData thì bắt buộc xóa Content-Type
    // Việc này giúp trình duyệt tự điền Content-Type kèm chuỗi boundary chính xác
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
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
            throw error; 
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