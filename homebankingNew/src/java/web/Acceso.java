
package web;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name="Acceso", urlPatterns={"/Acceso"})
public class Acceso extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        System.out.println("    [...] consultar");
        String usuario2 = "cine";
        String clave2 = "cine";
        String host = "jdbc:mysql://localhost:3306/nataliaCine";
        String querySql = "SELECT * FROM candy;";

        try {
           // Class.forName("com.mysql.jdbc.Driver");
            //Se conecta a la base de datos
            Connection con = DriverManager.getConnection(host, usuario2, clave2);

            //Prepara la consulta sql
            PreparedStatement pstm = con.prepareStatement(querySql);

            //Ejecuta la consulta
            ResultSet rs = pstm.executeQuery();

            //Recorre los resultados y los muestra
            while (rs.next()) {
                System.out.println(rs.getString("candy_nombr")
                        + " " + rs.getString("candy_precio"));
            }
        } catch (SQLException ex) {
            System.out.println("Alerta: " + ex.getMessage());
        } finally {

        }
        System.out.println("    [OK] consultar");
        
    }
   


}
