export default class Auth {

    static myInstance = null;
    authenticated = false;
    id = 0;
    userEmail = null;
    role = null;

    // Restore from localStorage    
    constructor() {
        if(window.localStorage.getItem("authenticator")) {
            this.authenticated = window.localStorage.getItem("authenticated");
            this.id = window.localStorage.getItem("authenticator");
            this.userEmail = window.localStorage.getItem("user_email");
            this.role = window.localStorage.getItem("user_role");
        }
    }

    static getInstance() {
        if( !Auth.myInstance ) {
            Auth.myInstance = new Auth();

            // For debug purpose
            this.id += 1;
        
        }

        return this.myInstance;
    }

    login(userEmail, userRole) {
        this.authenticated = true;
        this.userEmail = userEmail;
        this.role = userRole;
        window.localStorage.setItem("authenticator", this.id);
        window.localStorage.setItem("user_email", this.userEmail);
        window.localStorage.setItem("authenticated", this.authenticated);
        window.localStorage.setItem("user_role", this.role);
    }

    logout(callback) {
        this.authenticated = false;
        this.userEmail = null;
        window.localStorage.removeItem("authenticator");
        window.localStorage.removeItem("user_email");
        window.localStorage.removeItem("authenticated");
    }

    isAuthenticated() { return this.authenticated; }

}
