import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.math.BigDecimal;

@SessionScoped
@ManagedBean(name="validator")
public class MyValidator implements Serializable {

    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;

    public BigDecimal getR() {
        return r;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }
    public void validate(){
        Point point = new Point(getX(), getY(), getR());
    }

}
