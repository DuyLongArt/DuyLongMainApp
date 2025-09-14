import network
import time

# Customize your network credentials here
ssid = "RasberryRouter"
password = "duylongpass"

def connect_to_dhcp():
    """Connects the ESP32 to a Wi-Fi network using DHCP."""
    
    # Instantiate the station interface
    sta_if = network.WLAN(network.STA_IF)
    
    # If already connected, do nothing
    if sta_if.isconnected():
        print("Already connected to the network.")
        return sta_if

    # Activate the station interface
    print("Activating STA mode...")
    sta_if.active(True)
    
    # Connect to the specified Wi-Fi network
    print(f"Connecting to network '{ssid}'...")
    sta_if.connect(ssid, password)
    
    # Wait for the connection to be established
    timeout_seconds = 10
    start_time = time.time()
    
    while not sta_if.isconnected() and (time.time() - start_time) < timeout_seconds:
        print(".", end="")
        time.sleep(1)

    # Check if the connection was successful
    if sta_if.isconnected():
        print("\nConnection successful!")
        print("Network configuration:", sta_if.ifconfig())
    else:
        print("\nFailed to connect to the network.")
        sta_if.active(False) # Deactivate to save power
        return None
    
    return sta_if

if __name__ == "__main__":
    try:
        # Disable the AP interface to avoid conflicts
        ap_if = network.WLAN(network.AP_IF)
        if ap_if.active():
            ap_if.active(False)
        
        connected_interface = connect_to_dhcp()
        
        if connected_interface:
            while True:
                time.sleep(5)
                # Your main application logic runs here
                print("Connected and running...")
            
    except Exception as e:
        print("An error occurred:", e)

