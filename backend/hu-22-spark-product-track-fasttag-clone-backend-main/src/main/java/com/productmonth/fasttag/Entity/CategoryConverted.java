package com.productmonth.fasttag.Entity;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;
@Converter(autoApply = true)
public class CategoryConverted implements AttributeConverter<VehicleType,String> {
    @Override
    public String convertToDatabaseColumn(VehicleType vehicleType) {
        if(vehicleType==null){
            return null;
        }
        return vehicleType.getCode();
    }

    @Override
    public VehicleType convertToEntityAttribute(String code) {
        if(code==null){
            return null;
        }
        return Stream.of(VehicleType.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
