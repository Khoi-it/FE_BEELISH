// 1. Khai báo cho các file ảnh (PNG, JPG, SVG,...)
declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

declare module '*.webp' {
    const value: string;
    export default value;
}

// 2. Khai báo cho CSS thường
declare module '*.css';

// 3. Khai báo cho CSS Modules (Nếu sau này bạn có dùng file .module.css)
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}