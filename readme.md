docker pull ghcr.io/trungthanhbmtran/ebook:latest
docker run -d --name ebook-app -p 3000:3000 --restart unless-stopped ghcr.io/trungthanhbmtran/ebook:latest


Bước 1: Cài đặt Nginx
Dán lệnh này vào VPS để tải và cài đặt Nginx:

bash

sudo apt update
sudo apt install nginx -y
Bước 2: Tạo file cấu hình cho dự án
Gõ lệnh sau để mở trình soạn thảo văn bản tạo file cấu hình mới:

bash

sudo nano /etc/nginx/sites-available/ebook
Sau khi màn hình đen hiện ra, bạn Copy đoạn mã dưới đây và Dán vào:

nginx

server {
    listen 80;
    
    # THAY IP NÀY BẰNG IP VPS CỦA BẠN HOẶC TÊN MIỀN (VD: sachdautu.com)
    server_name _; 
    location / {
        # Chuyển hướng lưu lượng truy cập vào Container Docker đang chạy ở cổng 3000
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Chuyển tiếp IP thật của người dùng
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Cách lưu lại: Nhấn tổ hợp phím Ctrl + O (chữ O) -> Nhấn Enter -> Nhấn Ctrl + X để thoát ra ngoài.

Bước 3: Kích hoạt cấu hình
Chạy lần lượt 3 lệnh sau để xóa cấu hình mặc định cũ của Nginx, kích hoạt cấu hình mới và khởi động lại Nginx:

bash

sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/ebook /etc/nginx/sites-enabled/
sudo systemctl restart nginx
TIP

Ngay lúc này, nếu bạn gõ địa chỉ IP của VPS lên trình duyệt (không cần thêm đuôi :3000 nữa), trang web của bạn đã hiện ra!

Bước 4: (Tùy chọn) Gắn Tên miền và bảo mật HTTPS (Ổ khóa xanh)
Nếu bạn đã mua tên miền (ví dụ sachdautu.com) và trỏ về IP của VPS, hãy làm thêm bước này để web được mã hóa bảo mật.

Cài đặt công cụ Certbot:

bash

sudo apt install python3-certbot-nginx -y
Chạy lệnh cấp phát SSL tự động:

bash

sudo certbot --nginx -d sachdautu.com -d www.sachdautu.com
(Thay sachdautu.com bằng tên miền thật của bạn). Nó sẽ hỏi bạn email, cứ nhập email vào và nhấn Y đồng ý các điều khoản.