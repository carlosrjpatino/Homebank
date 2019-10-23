class Cuenta {
    static consultarTpl() {
        document.querySelector("#masterTpl").innerHTML = document.querySelector("#consultarTpl").innerHTML;
        document.querySelector("#mensajePnl").innerHTML = "";
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
        let width = Screen.detectWidth();
        let templateMov = "";
        if(width >= 600){
                    templateMov = `
                <table class="maestroPnl__tablaMov">
                    <tr><th>Fecha</th><th>Operacion</th><th>Importe</th><th>Saldo</th></tr>
                ${ movimientos.map ( movimiento => 
                        `
                        <tr>
                <td> ${movimiento.fecha} </td>
                <td> ${movimiento.descripcion} </td>
                <td> ${movimiento.importe} </td>
                <td class="maestroPnl--hide"> ${movimiento.saldo} </td>
                        </tr>

                        `
                        ).join('') }
                </table>
        `;
        }else{
            templateMov = "Version mobile.";
        }
        
        document.querySelector("#movimientosPnl").innerHTML = templateMov;
    }
}