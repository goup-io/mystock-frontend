
export class Cookie{
    
    static async getCookie(name) {
        let cookieArr = document.cookie.split(";");

        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");

            if(name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }

        // Return null if the cookie by that name does not exist
        return null;
    }

    static async setCookie(name, newValue){
        let cookieArr = document.cookie.split(";");

        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");

            if(name == cookiePair[0].trim()) {
                // Update the cookie value
                document.cookie = `${cookiePair[0]}=${encodeURIComponent(newValue)}`;
                return;
            }
        }

        // If the cookie does not exist, create a new one
        document.cookie = `${name}=${encodeURIComponent(newValue)}`;
    }

}

export default Cookie;
