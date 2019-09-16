
package web;

import com.google.gson.Gson;
import persistencia.LoginDao;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name="LoginServlet", urlPatterns={"/LoginServlet"})
public class LoginServlet extends HttpServlet {
Gson convertir;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Usuario: " + req.getParameter("user"));  
        System.out.println("Clave: " + req.getParameter("pass"));  
        try {
            LoginDao.acceso(req.getParameter("user"), req.getParameter("pass"));
        } catch (SQLException ex) {
            resp.getWriter().println("Exploto la base de datos: " + ex.getMessage());
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(LoginServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        resp.getWriter().println("Si, la comunicacion con el server funciona, chabon.");
    }
   
 

}
