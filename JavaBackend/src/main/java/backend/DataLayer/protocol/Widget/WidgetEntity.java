package backend.DataLayer.protocol.Widget;

import backend.DataLayer.protocol.StatusTypes;

import java.time.LocalDateTime;

public class WidgetEntity implements WidgetStructure
{
    private int id;
    private String name;
    private String type;
    private String urlId;
    private String roleId;

    public WidgetEntity(int id, String name, String type, String urlId, String roleId)
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.urlId = urlId;
        this.roleId = roleId;
    }

    public int getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public String getType()
    {
        return type;
    }

    @Override
    public StatusTypes getStatus()
    {
        return null;
    }

    public String getUrlId()
    {
        return urlId;
    }

    public String getRoleId()
    {
        return roleId;
    }

    @Override
    public LocalDateTime getCreatedAt()
    {
        return null;
    }

    @Override
    public LocalDateTime getUpdatedAt()
    {
        return null;
    }
}
