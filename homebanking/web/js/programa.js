class Login {
    
    static baseDeDatos(){
        // Esta seria nuestra base de datos.
        // En esta primer etapa lo manejamos desde el cliente, luego ira en el servidor con SQL.
        let cuentas = {
            user : "pedro",
            pass : "123"
        };
        return cuentas;
    }
    
    static entrar(){
        let user = document.querySelector("#user").value;
        let pass = document.querySelector("#pass").value;
        let datoCuenta = Login.baseDeDatos();
        console.log("Base de datos: " + datoCuenta.user);
        
        if (datoCuenta.user === user & datoCuenta.pass === pass) {
            console.log("ENTRASTE");
            Login.showPnlCuenta();
            Login.hidePnlLogin();
        } else {
            console.log("A la calle!");
            
        }
    }
    
    static salir() {
        
    }
    
    static init() {
        Login.showPnlLogin();
        Login.hidePnlCuenta();
        document.querySelector("#loginBtn").setAttribute("onclick","Login.entrar();");
    }
    
    static showPnlCuenta() {
        document.querySelector("#cuentaPnl").style.display = "flex";
    }
    
    static showPnlLogin() {
        document.querySelector("#loginPnl").style.display = "block";
    }
    
    static hidePnlCuenta() {
        document.querySelector("#cuentaPnl").style.display = "none";
    }
    
    static hidePnlLogin() {
        document.querySelector("#loginPnl").style.display = "none";
        
    }
}


Login.init();
