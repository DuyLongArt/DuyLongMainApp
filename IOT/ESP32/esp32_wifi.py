# boot.py
# This script runs on boot and configures the ESP32 as a Wi-Fi access point.

import network
import time
import machine 
import sys

# --- Wi-Fi Access Point Configuration ---
# Replace these with your desired Wi-Fi network credentials for the access point.
WIFI_SSID = 'ESP32_Access_Point'
WIFI_PASSWORD = 'duylongpass'

# --- LED Configuration (Optional) ---
# Replace with the GPIO pin number for your board's built-in LED.
# ESP32 development boards often have an onboard LED connected to GPIO2.
LED_PIN = 2
led = machine.Pin(LED_PIN, machine.Pin.OUT)
# --- Code ---
def display_information():
    print("System platform: "+sys.platform)
    while True:
        time.sleep(1)
        led.value(0)
        time.sleep(1)
        led.value(1)
        
    return 0
def do_start_ap():
    """
    Starts the ESP32 as a Wi-Fi access point.
    """
    # Initialize the on-board LED as an output
    
    led.value(0) # Turn LED off initially

    print('Starting Wi-Fi Access Point...')

    # Create a Wi-Fi access point interface
    ap = network.WLAN(network.AP_IF)
    
    # Configure and activate the access point
    ap.active(True)
    ap.config(essid=WIFI_SSID, password=WIFI_PASSWORD)
    
    # Flash LED to indicate starting AP
    timeout_start = time.time()
    while ap.active() and not ap.ifconfig()[0] and (time.time() - timeout_start) < 20:
        led.value(not led.value())
        time.sleep(0.5)
        led.value(0)

    if ap.ifconfig()[0] != '0.0.0.0':
        # Turn LED on to indicate a successful connection
        led.value(1) 
        print('Access Point started successfully!')
        print('Network config:', ap.ifconfig())
    else:
        # Turn LED off to indicate a failed start
        led.value(0)
        print('Failed to start access point.')

# Automatically call the function on startup
display_information()
do_start_ap()
