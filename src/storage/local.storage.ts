import Cookies from 'universal-cookie';
const cookies = new Cookies();
cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacman

export enum CookieFieldName {
    PREF_NAME = "PREF_NAME",
    PREF_COLOR = "PREF_COLOR"
}

export abstract class CookieStorage {
    static getPreference(name: CookieFieldName): string | null {
        const cookies = new Cookies();
        let value = cookies.get(name);
        if(value == null || value == undefined){
            return null;
        }
        return value;
    }
    static setPreference(name: CookieFieldName, value: string) {
        const cookies = new Cookies();
        cookies.set(name, value);
    }
};