class Login {

    static entrar() {
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

    static salir() {
        //Oculto el panel de la cuenta privada
        Login.hidePnlCuenta();
        //Muestro el login publico.
        Login.showPnlLogin();
    }

    static init() {
        //Muestra panel de login publico
        Login.showPnlLogin();
        //Oculta panel de cuenta privada
        Login.hidePnlCuenta();
        //A los botones de Login y Logout le asigna metodos de la Clase.
        document.querySelector("#loginBtn").setAttribute("onclick", "Login.entrar();");
        document.querySelector("#logoutBtn").setAttribute("onclick", "Login.salir();");

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

class Cuenta {
    static consultarTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#consultarTpl").innerHTML;
        document.querySelector("#mensajePnl").innerHTML = "";
        //let datoCuenta = Login.baseDeDatos();            
        let misDatos = JSON.parse(localStorage.getItem("miCuenta"));
        document.querySelector("#nombreUser").innerHTML = misDatos.nombre;
        document.querySelector("#saldo-cuenta").innerHTML = "$" + misDatos.saldo;
        document.querySelector("#limiteMonto").innerHTML = "$" + misDatos.limite;
        let operacion = "consulta";
        Movimiento.agregar(operacion, 0);
    }

    static extraerTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#extraerTpl").innerHTML;
    }

    static depositarTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#depositarTpl").innerHTML;
    }

    static depositarCalculo() {
        let operacion = "deposito";
        if (document.querySelector("#depositarInput").value <= 0) {
            document.querySelector("#pnlMensajeDepositar").innerHTML = "No se puede depositar menos de $1.";
        } else {
            let misDatos = JSON.parse(localStorage.getItem("miCuenta"));
            misDatos.saldo = parseInt(document.querySelector("#depositarInput").value) + misDatos.saldo;
            localStorage.setItem("miCuenta", JSON.stringify(misDatos));
            document.querySelector("#pnlMensajeDepositar").innerHTML = "Okay, deposito de $" + document.querySelector("#depositarInput").value;
            Movimiento.agregar(operacion, document.querySelector("#depositarInput").value);
        }
    }

    static extraerCalculo() {
        //let datoCuenta = Login.baseDeDatos();
        let operacion = "extraccion";

        if (document.querySelector("#extraerInput").value <= 0) {
            console.log("numero negativo o cero");
            document.querySelector("#pnlMensajeExtraer").innerHTML = "No se pudo extraer dinero. El monto debe ser mayor a $1.";
        } else {

            console.log("Si puede transferir");
            let misDatos = JSON.parse(localStorage.getItem("miCuenta"));

            if (document.querySelector("#extraerInput").value >= misDatos.limite) {
                document.querySelector("#pnlMensajeExtraer").innerHTML = "Superó el límite de extracción.";
            } else {
                console.log("saldo antes de extracion: " + misDatos.saldo);

                misDatos.saldo = misDatos.saldo - document.querySelector("#extraerInput").value;

                localStorage.setItem("miCuenta", JSON.stringify(misDatos));

                console.log("saldo despues de extracion: " + misDatos.saldo);

                document.querySelector("#pnlMensajeExtraer").innerHTML = "Extracción realizado por $" + document.querySelector("#extraerInput").value;
                Movimiento.agregar(operacion, document.querySelector("#extraerInput").value);
            }

        }


    }

    static limiteTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#limiteTpl").innerHTML;
    }

    static limiteCalculo() {
        console.log("Estas con actualizar el limite!");
        let misDatos = JSON.parse(localStorage.getItem("miCuenta"));
        if (document.querySelector("#limiteInput").value <= 0) {
            document.querySelector("#pnlMensajeLimite").innerHTML = "No se pudo modificar el limite. El monto debe ser mayor a $1.";
        } else {
            if (document.querySelector("#limiteInput").value < 8000) {
                console.log("Si puede actualizar el limite");
                misDatos.limite = document.querySelector("#limiteInput").value;
                localStorage.setItem("miCuenta", JSON.stringify(misDatos));
                document.querySelector("#pnlMensajeLimite").innerHTML = "Se actualizó el límite a $" + misDatos.limite;
            } else {
                console.log("El limite es muy grande");
                document.querySelector("#pnlMensajeLimite").innerHTML = "El limite es muy grande.";
            }

        }
    }
    
    static movimientoTpl(){
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#movimientosTpl").innerHTML;
        Cuenta.movimientoCalculo();
    }
    
    static movimientoCalculo(){
        let misDatos = JSON.parse(localStorage.getItem("miCuenta"));
        let movimientos = misDatos.movimientos;
        let templateMov = `
        <table>
            <tr><th>Fecha</th><th>Operacion</th><th>Importe</th><th>Saldo</th></tr>
        ${ movimientos.map ( movimiento => 
                `
                <tr>
        <td> ${movimiento.fecha} </td>
        <td> ${movimiento.descripcion} </td>
        <td> ${movimiento.importe} </td>
        <td> ${movimiento.saldo} </td>
                </tr>
                
                `
                ).join('') }
        </table>
`;
        document.querySelector("#movimientosPnl").innerHTML = templateMov;
    }
}

class Movimiento {
    static agregar(operacion, importe) {
        //1. Obtener el array
        //2. El array lo vamos a tomar del localStorage
        //3. agregar movimiento al array
        let misDatos = JSON.parse(localStorage.getItem("miCuenta"));
        console.log(operacion + " " + importe);
        misDatos.saldo;                        
        let movimiento = {
            fecha: new Date(),
            descripcion: operacion,
            importe: importe,
            saldo: misDatos.saldo
        };   
        
        misDatos.movimientos.push(movimiento);
        localStorage.setItem("miCuenta",JSON.stringify(misDatos));
    }
    
}

class BaseDeDatos {
    static datos() {
        // Esta seria nuestra base de datos.
        // En esta primer etapa lo manejamos desde el cliente, luego ira en el servidor con SQL.
        let cuentas = [
            {
                nombre: "Pedro Lopez",
                user: "lopez",
                pass: "321",
                saldo: 125000,
                limite: 5000,
                movimientos: []


            },
            {
                nombre: "Martin",
                user: "luna",
                pass: "9090",
                saldo: 55000,
                limite: 6000,
                movimientos: []
            },
            {
                nombre: "Romina",
                user: "gimenez",
                pass: "619",
                saldo: 0,
                limite: 3000,
                movimientos: []
            },
            {
                nombre: "Gonzalo",
                user: "coronel",
                pass: "1825",
                saldo: 1000,
                limite: 1000,
                movimientos: []
            }
        ];

        //Usamos el LocalStorage como base de datos
        localStorage.setItem("miBaseDeDatos", JSON.stringify(cuentas));
        return cuentas;
    }
}

//Hace arrancar el programa.
Login.init();
