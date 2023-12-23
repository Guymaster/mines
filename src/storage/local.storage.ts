import Cookies from 'universal-cookie';
const cookies = new Cookies();
cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacman

export enum LocalStorageFieldName {
    PREF_NAME = "PREF_NAME",
    PREF_COLOR = "PREF_COLOR",
    RECONNECT_TOKEN = "RECONNECT_TOKEN"
}

export abstract class LocalStorage {
    static getPreference(name: LocalStorageFieldName): string | null {
        let value = localStorage.getItem(name);
        if(value == null || value == undefined){
            return null;
        }
        return value;
    }
    static setPreference(name: LocalStorageFieldName, value: string) {
        localStorage.setItem(name, value);
    }
    static getReconnectToken(): string | null {
        let value = localStorage.getItem(LocalStorageFieldName.RECONNECT_TOKEN);
        if(value == null || value == undefined){
            return null;
        }
        return value;
    }
    static setReconnectToken(value: string) {
        localStorage.setItem(LocalStorageFieldName.RECONNECT_TOKEN, value);
    }
};