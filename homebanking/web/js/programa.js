class Login {

    static baseDeDatos() {
        // Esta seria nuestra base de datos.
        // En esta primer etapa lo manejamos desde el cliente, luego ira en el servidor con SQL.
        let cuentas = {
            nombre: "Pedro Lopez",
            user: "pedro",
            pass: "123",
            saldo: 55000,
            limite: 5000
        };

        //Usamos el LocalStorage como base de datos
        localStorage.setItem("miBaseDeDatos", JSON.stringify(cuentas));
        return cuentas;
    }

    static entrar() {
        let user = document.querySelector("#user").value;
        let pass = document.querySelector("#pass").value;
        let datoCuenta = Login.baseDeDatos();
        if (datoCuenta.user === user & datoCuenta.pass === pass) {
            //Muestra el panel de cuenta privada.
            Login.showPnlCuenta();
            //Oculta el panel de login publico.
            Login.hidePnlLogin();
            Login.consultarTpl();
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

    static consultarTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#consultarTpl").innerHTML;
        document.querySelector("#mensajePnl").innerHTML = "";
        //let datoCuenta = Login.baseDeDatos();            
        let misDatos = JSON.parse(localStorage.getItem("miBaseDeDatos"));
        document.querySelector("#nombreUser").innerHTML = misDatos.nombre;
        document.querySelector("#saldo-cuenta").innerHTML = "$" + misDatos.saldo;
        document.querySelector("#limiteMonto").innerHTML = "$" + misDatos.limite;
    }

    static extraerTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#extraerTpl").innerHTML;
    }

    static depositarTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#depositarTpl").innerHTML;
    }

    static depositarCalculo() {
        if (document.querySelector("#depositarInput").value <= 0) {
            document.querySelector("#pnlMensajeDepositar").innerHTML = "No se puede depositar menos de $1.";
        } else {
            let misDatos = JSON.parse(localStorage.getItem("miBaseDeDatos"));
            misDatos.saldo = parseInt(document.querySelector("#depositarInput").value) + misDatos.saldo;
            localStorage.setItem("miBaseDeDatos", JSON.stringify(misDatos));
            document.querySelector("#pnlMensajeDepositar").innerHTML = "Okay, deposito de $" + document.querySelector("#depositarInput").value;
        }
    }

    static extraerCalculo() {
        //let datoCuenta = Login.baseDeDatos();

        if (document.querySelector("#extraerInput").value <= 0) {
            console.log("numero negativo o cero");
            document.querySelector("#pnlMensajeExtraer").innerHTML = "No se pudo extraer dinero. El monto debe ser mayor a $1.";
        } else {

            console.log("Si puede transferir");
            let misDatos = JSON.parse(localStorage.getItem("miBaseDeDatos"));

            if (document.querySelector("#extraerInput").value >= misDatos.limite) {
                document.querySelector("#pnlMensajeExtraer").innerHTML = "Superó el límite de extracción.";
            } else {
                console.log("saldo antes de extracion: " + misDatos.saldo);

                misDatos.saldo = misDatos.saldo - document.querySelector("#extraerInput").value;

                localStorage.setItem("miBaseDeDatos", JSON.stringify(misDatos));

                console.log("saldo despues de extracion: " + misDatos.saldo);

                document.querySelector("#pnlMensajeExtraer").innerHTML = "Extracción realizado por $" + document.querySelector("#extraerInput").value;
            }

        }


    }

    static limiteTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#limiteTpl").innerHTML;
    }

    static limiteCalculo() {
        console.log("Estas con actualizar el limite!");
        let misDatos = JSON.parse(localStorage.getItem("miBaseDeDatos"));
        if (document.querySelector("#limiteInput").value <= 0) {
            document.querySelector("#pnlMensajeLimite").innerHTML = "No se pudo modificar el limite. El monto debe ser mayor a $1.";
        } else {
            if (document.querySelector("#limiteInput").value < 8000) {
                console.log("Si puede actualizar el limite");
                misDatos.limite = document.querySelector("#limiteInput").value;
                localStorage.setItem("miBaseDeDatos", JSON.stringify(misDatos));
                document.querySelector("#pnlMensajeLimite").innerHTML = "Se actualizó el límite a $" + misDatos.limite;
            } else {
                console.log("El limite es muy grande");
                document.querySelector("#pnlMensajeLimite").innerHTML = "El limite es muy grande.";
            }

        }




    }

    static init() {
        //Muestra panel de login publico
        Login.showPnlLogin();
        //Oculta panel de cuenta privada
        Login.hidePnlCuenta();
        //A los botones de Login y Logout le asigna metodos de la Clase.
        document.querySelector("#loginBtn").setAttribute("onclick", "Login.entrar();");
        document.querySelector("#logoutBtn").setAttribute("onclick", "Login.salir();");


        document.querySelector("#extraerOpt").setAttribute("onclick", "Login.extraerTpl();");
        document.querySelector("#extraerBtn").setAttribute("onclick", "Login.extraerCalculo();");
        document.querySelector("#consultarOpt").setAttribute("onclick", "Login.consultarTpl();");
        document.querySelector("#depositarOpt").setAttribute("onclick", "Login.depositarTpl()");
        document.querySelector("#depositarBtn").setAttribute("onclick", "Login.depositarCalculo();");

        document.querySelector("#limiteOpt").setAttribute("onclick", "Login.limiteTpl()");
        document.querySelector("#limiteBtn").setAttribute("onclick", "Login.limiteCalculo();");



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
