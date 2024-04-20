
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

}

export default Cookie;
