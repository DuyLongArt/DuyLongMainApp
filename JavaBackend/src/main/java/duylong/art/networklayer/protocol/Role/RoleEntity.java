package duylong.art.networklayer.protocol.Role;

public class RoleEntity implements RoleStructure
{
    private int personId;
    private String personName;
    private String role;

    public RoleEntity(int personId, String personName, String role) {
        this.personId = personId;
        this.personName = personName;
        this.role = role;
    }

    @Override
    public int getPersonId() {
        return personId;
    }

    @Override
    public String getPersonName() {
        return personName;
    }

    @Override
    public String getRole() {
        return role;
    }
}
