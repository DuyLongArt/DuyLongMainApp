package backend.DataLayer.protocol.Widget;

import backend.DataLayer.protocol.RoleTypes;
import backend.DataLayer.protocol.StatusTypes;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class WidgetEntity implements WidgetStructure
{
    // Fields from Dart/Network context
    private String url;
    private String host;
    private String protocol;
    private String ipAddress; // Renamed IP to ipAddress for Java convention
    private LocalDate dateAdded;
    private String imageUrl;

    // Fields from Java/Structure context
    private int widgetID; // Corresponds to widgetID in Dart context
    private String name;
    private String type;
    private String roleId;
    private RoleTypes roleType;

    // --- CONSTRUCTORS ---

    // Primary constructor incorporating all required fields
    public WidgetEntity(int id, String name, String type, String url, String host, String protocol, String roleId, RoleTypes roleType, String imageUrl, LocalDate dateAdded)
    {
        this.widgetID = id;
        this.name = name;
        this.type = type;
        this.url = url;
        this.host = host;
        this.protocol = protocol;
        this.roleId = roleId;
        this.roleType = roleType;
        this.imageUrl = imageUrl;
        this.dateAdded = dateAdded;
    }

    // Simplified constructor (similar to your original structure, but using modern field names)
    public WidgetEntity(int id, String name, String type, String url, String roleId)
    {
        this.widgetID = id;
        this.name = name;
        this.type = type;
        this.url = url; // Using 'url' directly instead of 'urlId'
        this.roleId = roleId;

        // Initialize other fields to default/null
        this.host = null;
        this.protocol = null;
        this.roleType = null;
        this.imageUrl = null;
        this.dateAdded = null;
    }

    // --- GETTERS (Implementing WidgetStructure methods) ---

    @Override
    public int getWidgetID()
    {
        return widgetID;
    }

    public String getName()
    {
        return name;
    }

    public String getType()
    {
        return type;
    }

    public String getUrl()
    {
        return url;
    }

    public String getHost()
    {
        return host;
    }

    public String getProtocol()
    {
        return protocol;
    }

    public String getRoleId()
    {
        return roleId;
    }

    public RoleTypes getRoleType()
    {
        return roleType;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public LocalDate getDateAdded()
    {
        return dateAdded;
    }

    // --- GETTERS (Implementing WidgetStructure methods) ---

    @Override
    public StatusTypes getStatus()
    {
        // Must return actual status logic or a default
        return StatusTypes.ACTIVE;
    }

    @Override
    public LocalDateTime getCreatedAt()
    {
        // Should return the creation time
        return null;
    }

    @Override
    public LocalDateTime getUpdatedAt()
    {
        // Should return the last updated time
        return null;
    }

    // --- SETTERS (Optional, but common for Entities) ---
    // public void setHost(String host) { this.host = host; }
    // public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    // ...
}