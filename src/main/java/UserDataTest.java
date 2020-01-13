import java.io.Serializable;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "userDataTest", eager = true)
@SessionScoped
public class UserDataTest implements Serializable {
    private static final long serialVersionUID = 1L;


    public int getCount(String un){
        ResultSet rs = null;
        PreparedStatement pst = null;
        Connection con = getConnection();
        String stm = "SELECT COUNT(*) FROM POINTS WHERE USERNAME"+"=\'"+un+"\'";
        int c=0;
        try {
            pst = con.prepareStatement(stm);
            pst.execute();
            rs = pst.getResultSet();
            while (rs.next()) {
                c = rs.getInt(1);
            }
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return c;
    }

    public void cleanHistory(String un){
        PreparedStatement pst = null;
        String stm = "DELETE FROM POINTS WHERE USERNAME"+"=\'"+un+"\'";
        Connection con = getConnection();
        try {
            pst = con.prepareStatement(stm);
            pst.execute();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void addPoint(Point point){
        PreparedStatement pst = null;
        String stm = "INSERT INTO POINTS (X, Y, R, HIT, USERNAME, DATE_CREATED) VALUES (?,?,?,?,?,?)";
        Connection con = getConnection();
        try {
            pst = con.prepareStatement(stm);
            pst.setFloat(1,new Float(point.getX().toString()));
            pst.setFloat(2,new Float(point.getY().toString()));
            pst.setFloat(3,new Float(point.getR().toString()));
            pst.setString(4, point.getInArea());
            pst.setString(5,point.getUserName());
            pst.setTimestamp(6, new java.sql.Timestamp(System.currentTimeMillis()));
            pst.execute();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Point> getPoints(String un) {
        ResultSet rs = null;
        PreparedStatement pst = null;
        Connection con = getConnection();
        String stm = "SELECT * FROM POINTS WHERE USERNAME"+"=\'"+un+"\'";
        List<Point> records = new ArrayList<Point>();

        try {
            pst = con.prepareStatement(stm);
            pst.execute();
            rs = pst.getResultSet();

            while(rs.next()) {
                Point point = new Point();
                point.setX(rs.getBigDecimal(1));
                point.setY(rs.getBigDecimal(2));
                point.setR(rs.getBigDecimal(3));
                point.setInArea(rs.getString(4));
                point.setUserName(rs.getString(5));
                point.setDate(rs.getTimestamp(6));
                records.add(point);
            }
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return records;
    }

    public Connection getConnection() {
        Connection con = null;
        String url = "jdbc:oracle:thin:@localhost:1521:orbis";
        String user = "s264474";
        String password = "oov646";

        try {
            con = DriverManager.getConnection(url, user, password);
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());}

        finally {
        }
        return con;
    }

}