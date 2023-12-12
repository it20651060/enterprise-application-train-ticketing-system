package com.sliit.ead.Model;
import java.io.Serializable;

public class Reservation implements Serializable {

    String id,date,time,price,noOfTicket,start,end,trainId,total;

    public Reservation(Reservation reservation) {
        this.id=reservation.id;
        this.date=reservation.date;
        this.time=reservation.time;
        this.price=reservation.price;
        this.noOfTicket=reservation.noOfTicket;
        this.start=reservation.start;
        this.end=reservation.end;
        this.trainId=reservation.trainId;
        this.total=reservation.total;
    }

    public Reservation(String id, String date, String time, String price, String noOfTicket, String start, String end, String trainId,String total){
        this.id=id;
        this.date=date;
        this.time=time;
        this.price=price;
        this.noOfTicket=noOfTicket;
        this.start=start;
        this.end=end;
        this.trainId=trainId;
        this.total=total;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getNoOfTicket() {
        return noOfTicket;
    }

    public void setNoOfTicket(String noOfTicket) {
        this.noOfTicket = noOfTicket;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getTrainId() {
        return trainId;
    }

    public void setTrainId(String trainId) {
        this.trainId = trainId;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }
}

