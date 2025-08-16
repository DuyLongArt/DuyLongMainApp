import RPi.GPIO as GPIO
import time

# Sử dụng chế độ đánh số chân vật lý (BCM)
GPIO.setmode(GPIO.BCM)

# Thiết lập chân GPIO 17 là đầu vào, với điện trở kéo lên nội bộ
# Điện trở kéo lên đảm bảo chân GPIO đọc giá trị HIGH khi nút không được nhấn
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)

print("Nhấn nút để xem trạng thái. Nhấn CTRL+C để thoát.")

try:
    while True:
        # Đọc trạng thái của chân GPIO
        input_state = GPIO.input(17)
        if input_state == False:  # Nút được nhấn sẽ kéo chân GPIO xuống GND (LOW/False)
            print("Đã nhấn nút!")
            time.sleep(0.2) # Chờ một chút để tránh đọc nhiều lần cho một lần nhấn
except KeyboardInterrupt:
    print("Chương trình kết thúc.")
finally:
    GPIO.cleanup() # Dọn dẹp các thiết lập GPIO