Hướng dẫn sử dụng:
1. Cài đặt NodeJS
2. Update thư viện "npm i"
3. Chạy ở chế độ dev: "npm run dev"

Cấu trúc thư mục:
- "package.json" : Config project
- "/src/pages" : Nơi chứa các page, mỗi page tương ứng với 1 file
    + "/src/pages/_document.tsx" : HTML layout config
    + "/src/pages/_app.tsx" : nơi bắt đầu render giao diện
    + "/src/pages/device.tsx" : device page
    + "/src/pages/index.tsx" : home page
    + "/src/pages/login.tsx" : login page