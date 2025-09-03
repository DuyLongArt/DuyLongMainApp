package backend.DataLayer.protocol.Widget;

import backend.DataLayer.protocol.StatusTypes;

import java.time.LocalDateTime;

public interface WidgetStructure
{
    int getId();

    String getName();

    String getType();

    StatusTypes getStatus();

    String getUrlId();
    String getRoleId();

    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();

}
