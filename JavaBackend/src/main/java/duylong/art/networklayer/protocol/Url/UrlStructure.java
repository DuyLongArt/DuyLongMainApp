package duylong.art.networklayer.protocol.Url;

public interface UrlStructure
{
    int getId();

    String getUrlValue();

    String getHost();
    String getPath();

    void setPath(String path);

    void setHost(String host);

    void setUrlValue(String urlValue);
}
