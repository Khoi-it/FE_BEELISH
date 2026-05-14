# Frontend Beelish (English Study)
Dự án này là phần Frontend của ứng dụng học tiếng Anh Beelish, được xây dựng dựa trên nền tảng React với Vite, sử dụng TypeScript để đảm bảo tính chặt chẽ về dữ liệu và Tailwind CSS với Bootstrap cho giao diện.

## Cấu trúc thư mục (Folder Structure)
Dự án được tổ chức theo cấu trúc module hóa, giúp phân tách rõ ràng giữa giao diện, logic xử lý và quản lý trạng thái. Dưới đây là cấu trúc chi tiết của thư mục src/:

```text
src/
├── api/             # Quản lý giao tiếp API
├── assets/          # Tài nguyên tĩnh
├── components/      # Các thành phần giao diện dùng chung
├── constants/       # Hằng số hệ thống
├── contexts/        # Quản lý trạng thái toàn cục
├── pages/           # Các màn hình chính
├── styles/          # Cấu hình phong cách
├── App.css          # CSS riêng cho thành phần App
├── App.tsx          # Cấu hình Routes và Layout chính của ứng dụng
├── index.css        # CSS tổng thể và Tailwind directives
└── main.tsx         # Điểm khởi chạy ứng dụng (Entry Point)
```
## Luồng hoạt động cơ bản (Data Flow)
Khi người dùng tương tác với giao diện, dữ liệu sẽ được xử lý theo luồng khép kín sau:

Tương tác người dùng: Người dùng thực hiện một hành động.

Xử lý tại Page: Component tại thư mục pages/ tiếp nhận sự kiện. Nếu cần dữ liệu từ Server, nó sẽ gọi đến các hàm trong thư mục api/ hoặc lấy dữ liệu từ contexts/.

Cập nhật Trạng thái (State): Dữ liệu sau khi lấy về thành công sẽ được cập nhật vào State cục bộ của Page hoặc State toàn cục trong Context.

Cập nhật Giao diện (Re-render): Nhờ cơ chế Virtual DOM của React, giao diện sẽ được tính toán và vẽ lại ngay lập tức tại những vị trí dữ liệu thay đổi mà không cần tải lại toàn bộ trang.