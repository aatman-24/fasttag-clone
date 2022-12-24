package com.productmonth.fasttag.Dto;

import lombok.Data;

/*at the time of deducting the balance we need cardId, tollStationId and the amount previously they are coming
in the url but now we have made a Dto to handle that. */
@Data
public class DeductBalanceDto {
    
    private String cardId;
    private Integer tollStationId;

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public Integer getTollStationId() {
        return tollStationId;
    }

    public void setTollStationId(Integer tollStationId) {
        this.tollStationId = tollStationId;
    }
}
