class Login {
    
    static baseDeDatos(){
        // Esta seria nuestra base de datos.
        // En esta primer etapa lo manejamos desde el cliente, luego ira en el servidor con SQL.
        let cuentas = {
            nombre : "Pedro Lopez",
            user : "pedro",
            pass : "123",
            saldo : 55000,
            limite: 5000
        };
        return cuentas;
    }
    
    static entrar(){
        let user = document.querySelector("#user").value;
        let pass = document.querySelector("#pass").value;
        let datoCuenta = Login.baseDeDatos();        
        if (datoCuenta.user === user & datoCuenta.pass === pass) {
            //Muestra el panel de cuenta privada.
            Login.showPnlCuenta();
            //Oculta el panel de login publico.
            Login.hidePnlLogin();
            document.querySelector("#mensajePnl").innerHTML = "";
            
            document.querySelector("#nombreUser").innerHTML = datoCuenta.nombre;
            document.querySelector("#saldo-cuenta").innerHTML = "$" + datoCuenta.saldo;
            document.querySelector("#limiteMonto").innerHTML = "$" + datoCuenta.limite;
            
        } else {
            //Muestra mensaje de error
            document.querySelector("#mensajePnl").innerHTML = "Usuario o contraseña incorrecto.";
            
        }
    }
    
    static salir() {
        //Oculto el panel de la cuenta privada
        Login.hidePnlCuenta();
        //Muestro el login publico.
        Login.showPnlLogin();
    }
    
    static extraerTpl(){
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#extraerTpl").innerHTML;
    }
    
    static extraerCalculo(){
        let datoCuenta = Login.baseDeDatos();
        console.log("saldo antes de extracion: " + datoCuenta.saldo);
        datoCuenta.saldo = datoCuenta.saldo - document.querySelector("#extraerInput").value;
        console.log("saldo despues de extracion: " + datoCuenta.saldo);
    }
    
    static init() {
        //Muestra panel de login publico
        Login.showPnlLogin();
        //Oculta panel de cuenta privada
        Login.hidePnlCuenta();
        //A los botones de Login y Logout le asigna metodos de la Clase.
        document.querySelector("#loginBtn").setAttribute("onclick","Login.entrar();");       
        document.querySelector("#logoutBtn").setAttribute("onclick","Login.salir();");
        
        
        document.querySelector("#extraerOpt").setAttribute("onclick","Login.extraerTpl();");
        document.querySelector("#extraerBtn").setAttribute("onclick","Login.extraerCalculo();");
        
        
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

//Hace arrancar el programa.
Login.init();
