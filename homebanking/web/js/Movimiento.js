class Movimiento {
    static agregar(operacion, importe) {
        //1. Obtener el array
        //2. El array lo vamos a tomar del localStorage
        //3. agregar movimiento al array
        let misDatos = JSON.parse(localStorage.getItem("miCuenta"));
        console.log(operacion + " " + importe);
        misDatos.saldo;                        
        let movimiento = {
            fecha: new Date().toLocaleDateString("es-ES"),
            descripcion: operacion,
            importe: importe,
            saldo: misDatos.saldo
        };   
        
        misDatos.movimientos.push(movimiento);
        localStorage.setItem("miCuenta",JSON.stringify(misDatos));
    }
    
}