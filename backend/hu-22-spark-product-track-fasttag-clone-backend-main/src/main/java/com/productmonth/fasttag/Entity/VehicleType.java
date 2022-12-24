package com.productmonth.fasttag.Entity;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.stream.Stream;
public enum VehicleType {
    /* this is from a diff article
    BUS("bus"),CAR("car"),TRUCK("truck"),BIKE("bike"),SCOOTY("scooty"),TROOLY("trolly");
    //with the help of this type field we maintain the reference to the whole-application
    private String type;
    private VehicleType(String type){
        this.type=type;
    }
    @JsonCreator //interpret the Json-data to enumeration
    public static VehicleType decode(final String type) {
        return Stream.of(VehicleType.values()).filter(targetEnum -> targetEnum.type.equals(type)).findFirst().orElse(null);
    }
    @JsonValue
    public String getType() {
        return type;
    }*/
    /* we can do this alongwith using the @Enumerated(EnumType.STRING) but the issue is that if we
       rename the names of the enum then it will gonna to break the data inside the database
       BUS,CAR,TRUCK,BIKE
    */
    BUS("bus"), CAR("car"), TRUCK("truck"), BIKE("bike");

    private String code;
    private VehicleType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}
