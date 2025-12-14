package backend.DataLayer.protocol.Widget;

import backend.DataLayer.protocol.RoleTypes;
import backend.DataLayer.protocol.StatusTypes;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface WidgetStructure
{
    // --- Core Entity Identifiers ---
    int getWidgetID();
    String getName();
    String getType();

    // --- Network & Data Fields (from previous Dart/Java context) ---
    String getUrl();        // The specific path/query string (e.g., "watch?v=...")
    String getHost();       // The server name (e.g., "www.youtube.com")
    String getProtocol();   // The transfer protocol (e.g., "https")
    String getIpAddress();  // The optional IP address (can return null)
    String getImageUrl();   // The image URL

    // --- Role and Status ---
    String getRoleId();     // The ID string for the role
    RoleTypes getRoleType(); // The Role type enum
    StatusTypes getStatus();

    // --- Timestamps ---
    LocalDate getDateAdded(); // Using LocalDate as per your WidgetEntity
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();

    // NOTE: getUrlId() from your original interface is covered by getUrl()
    // unless 'urlId' specifically means an internal database ID for a URL.
    // If you need the old method name, you can keep it: String getUrlId();
}