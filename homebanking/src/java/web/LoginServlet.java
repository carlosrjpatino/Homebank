
package web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name="LoginServlet", urlPatterns={"/LoginServlet"})
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Usuario: " + req.getParameter("user"));  
        System.out.println("Clave: " + req.getParameter("pass"));  
        
        resp.getWriter().println("Si, la comunicacion con el server funciona, chabon.");
    }
   
 

}
