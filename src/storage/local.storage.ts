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
    static setReconnectToken(value: string | null) {
        if(value == null){
            localStorage.removeItem(LocalStorageFieldName.RECONNECT_TOKEN);
            return;
        }
        localStorage.setItem(LocalStorageFieldName.RECONNECT_TOKEN, value);
    }
};