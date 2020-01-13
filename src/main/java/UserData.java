import java.io.Serializable;

import java.sql.*;

import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "userData", eager = true)
@SessionScoped
public class UserData implements Serializable {
    private static final long serialVersionUID = 1L;

    private ResultSet rs;
    private Statement st;
    private Connection connection;
    private String stm;
    private List<Point> records;

    public UserData(){
        rs = null;
        st = null;
        connection = null;
        stm = "SELECT * FROM POINTS";
        records = new ArrayList<Point>();
    }

    public void addPoint(Point point){
        try{
            st=connection.createStatement();
            st.execute("INSERT INTO POINTS (X, Y, R, HIT) VALUES ("+point.toString()+")");
        }catch (SQLException e){
            e.printStackTrace();
        }
    }

    public List<Point> getPoints() {

        try {
            connection=getConnection();
            st = connection.createStatement();
            st.executeQuery(stm);
            rs = st.executeQuery(stm);;

            while(rs.next()) {
                Point point = new Point();
                System.out.println(rs.getBigDecimal(1));
                System.out.println(rs.getBigDecimal(2));
                System.out.println(rs.getBigDecimal(3));
                point.setX(rs.getBigDecimal(1));
                point.setY(rs.getBigDecimal(2));
                point.setR(rs.getBigDecimal(3));
                point.setInArea(rs.getString(4));
                records.add(point);
            }
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return records;
    }

    public Connection getConnection() {
        Connection connection = null;
        String url = "jdbc:oracle:thin:@localhost:1521:orbis";
        String user = "s264474";
        String password = "oov646";

        try {
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Connection completed.");
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        finally {
        }
        return connection;
    }
}
