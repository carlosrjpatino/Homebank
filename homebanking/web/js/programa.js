class Login {
    
    static entrar(){
        
    }
    
    static salir() {
        
    }
    
    static init() {
        Login.showPnlLogin();
        Login.hidePnlCuenta();
    }
    
    static showPnlCuenta() {
        document.querySelector("#cuentaPnl").style.display = "block";
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
