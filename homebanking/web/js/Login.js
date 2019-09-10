class Login {

    static entrarLocal() {
        let userInput = document.querySelector("#user").value;
        let passInput = document.querySelector("#pass").value;
        let datoCuenta = BaseDeDatos.datos();

        //muestra por consola el listado completo de usuarios
        datoCuenta.map(usuarioPorUsuario =>
            console.log(usuarioPorUsuario.nombre)
        );

        //encuentra un usuario que se busque
        let userBuscados = datoCuenta.find(usuarioPorUsuario =>
            usuarioPorUsuario.user === userInput);

        if (userBuscados === undefined) {
            //No encontro el usuario
            //Muestra mensaje de error
            document.querySelector("#mensajePnl").innerHTML = "Usuario o contraseña incorrecto.";
        } else {
            //Encontro el usuario
            //Debemos comparar el password
            if (userBuscados.pass === passInput) {
                //Muestra el panel de cuenta privada.
                Login.showPnlCuenta();
                //Oculta el panel de login publico.
                Login.hidePnlLogin();
                localStorage.setItem("miCuenta", JSON.stringify(userBuscados));
                Cuenta.consultarTpl();

            } else {
                //Muestra mensaje de error
                document.querySelector("#mensajePnl").innerHTML = "Usuario o contraseña incorrecto.";
            }
        }
        console.log("userBUscado:" + JSON.stringify(userBuscados));
    }

    static salirLocal() {
        //Oculto el panel de la cuenta privada
        Login.hidePnlCuenta();
        //Muestro el login publico.
        Login.showPnlLogin();
    }
    
    static entrarServer(){
        let userInput = document.querySelector("#user").value;
        let passInput = document.querySelector("#pass").value;
        Http.doGet("LoginServlet" + "?&user=" + userInput + "&pass=" + passInput);
    }

    static init() {
        //Muestra panel de login publico
        Login.showPnlLogin();
        //Oculta panel de cuenta privada
        Login.hidePnlCuenta();
        //A los botones de Login y Logout le asigna metodos de la Clase.
        document.querySelector("#loginBtnLocal").setAttribute("onclick", "Login.entrarLocal();");
        document.querySelector("#loginBtnServer").setAttribute("onclick", "Login.entrarServer();");
        
        document.querySelector("#logoutBtn").setAttribute("onclick", "Login.salirLocal();");

        document.querySelector("#extraerOpt").setAttribute("onclick", "Cuenta.extraerTpl();");
        document.querySelector("#extraerBtn").setAttribute("onclick", "Cuenta.extraerCalculo();");
        document.querySelector("#consultarOpt").setAttribute("onclick", "Cuenta.consultarTpl();");
        document.querySelector("#depositarOpt").setAttribute("onclick", "Cuenta.depositarTpl()");
        document.querySelector("#depositarBtn").setAttribute("onclick", "Cuenta.depositarCalculo();");
        document.querySelector("#limiteOpt").setAttribute("onclick", "Cuenta.limiteTpl()");
        document.querySelector("#limiteBtn").setAttribute("onclick", "Cuenta.limiteCalculo();");
        document.querySelector("#movimientosOpt").setAttribute("onclick", "Cuenta.movimientoTpl();");
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