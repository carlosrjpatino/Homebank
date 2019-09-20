
package persistencia;

import entidades.DB;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LoginDao {

    public static void acceso(String usuario, String clave) throws SQLException, ClassNotFoundException {
        System.out.println("    [...] consultar");
        
        String querySql = "SELECT * FROM candy;";

        try {
           // Class.forName("com.mysql.jdbc.Driver");
            //Se conecta a la base de datos
            Connection con = DB.getInstance().getConnection();

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
        } catch (IOException ex) {
            System.out.println("Alerta: " + ex.getMessage());
        } finally {

        }
        System.out.println("    [OK] consultar");
    }
    
}
