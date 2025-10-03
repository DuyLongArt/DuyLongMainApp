import machine
import time
from machine import Pin, Timer, RTC

# Configure LED pin (change pin number based on your board)
# For ESP32, common pins are 2, 4, 5, 18, 19, 21, etc.
# For Raspberry Pi Pico, use pins 0-28
LED_PIN = 2
led = Pin(LED_PIN, Pin.OUT)

# Option 1: Simple LED blink with timer
def turn_on():
    led.on()
    print("LED ON")
    time.sleep(1)
def turn_off():
    led.off()
    print("LED OFF")
    time.sleep(1)
# Option 2: LED on/off based on time intervals
def timed_control(on_duration=5, off_duration=3, cycles=10):
    """
    Controls LED with custom on/off durations
    on_duration: seconds LED stays on
    off_duration: seconds LED stays off
    cycles: number of on/off cycles (0 for infinite)
    """
    count = 0
    while cycles == 0 or count < cycles:
        # Turn LED on
        led.on()
        print(f"Cycle {count + 1}: LED ON for {on_duration}s")
        time.sleep(on_duration)

        # Turn LED off
        led.off()
        print(f"Cycle {count + 1}: LED OFF for {off_duration}s")
        time.sleep(off_duration)

        if cycles > 0:
            count += 1

# Option 3: Schedule-based LED control (simplified time-based)
def scheduled_control():
    """
    Turn LED on/off based on time of day
    This example uses elapsed time since boot
    """
    # Define schedule (seconds since start)
    schedule = [
        {"start": 5, "end": 10},    # LED on from 5s to 10s
        {"start": 20, "end": 30},   # LED on from 20s to 30s
        {"start": 40, "end": 50},   # LED on from 40s to 50s
    ]
    start_time = time.ticks_ms()
    while True:
        current_time = time.ticks_diff(time.ticks_ms(), start_time) // 1000

        # Check if current time is in any scheduled periodt
turn_off()  
