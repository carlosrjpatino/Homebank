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