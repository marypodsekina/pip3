import com.sun.faces.application.ValidateComponentNesting;

import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Point implements Serializable {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private String inArea="";
    private String userName="";
    private Date date;
    private String strDate;
    public Point(){
    }
    public Point(BigDecimal x, BigDecimal y, BigDecimal r){
        this.x=x;
        this.y=y;
        this.r=r;
        if((((y.compareTo(new BigDecimal("0"))>=0)&&(x.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(r.multiply(new BigDecimal(0.5)))<=0)&&(x.compareTo(r.multiply(new BigDecimal("-1")))>=0))||
                (((x.multiply(x).add(y.multiply(y))).compareTo(r.multiply(new BigDecimal(0.5)).multiply(r.multiply(new BigDecimal(0.5))))<=0)&&(x.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(new BigDecimal("0"))<=0))||
                ((x.compareTo(new BigDecimal("0"))>=0)&&(y.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(x.multiply(new BigDecimal(2)).subtract(r))>=0)))){
            this.inArea="Yes";
        }else{
            this.inArea="No";
        }
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public BigDecimal getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getR() {
        return r;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public String getInArea() {
        if((((y.compareTo(new BigDecimal("0"))>=0)&&(x.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(r.multiply(new BigDecimal(0.5)))<=0)&&(x.compareTo(r.multiply(new BigDecimal("-1")))>=0))||
                (((x.multiply(x).add(y.multiply(y))).compareTo(r.multiply(new BigDecimal(0.5)).multiply(r.multiply(new BigDecimal(0.5))))<=0)&&(x.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(new BigDecimal("0"))<=0))||
                ((x.compareTo(new BigDecimal("0"))>=0)&&(y.compareTo(new BigDecimal("0"))<=0)&&(y.compareTo(x.multiply(new BigDecimal(2)).subtract(r))>=0)))){
            return "Yes";
        }else{
            return "No";
        }
    }

    public void setInArea(String inArea) {
        this.inArea = inArea;
    }
    public String toString(){
        return this.getX()+", "+this.getY()+", "+this.getR()+", "+"\'"+this.getInArea()+"\'"+", "+"\'"+this.getUserName()+"\'";
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStrDate() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss z");
        return simpleDateFormat.format(date);
    }

    public void setStrDate(String strDate) {
        this.strDate = strDate;
    }
}
