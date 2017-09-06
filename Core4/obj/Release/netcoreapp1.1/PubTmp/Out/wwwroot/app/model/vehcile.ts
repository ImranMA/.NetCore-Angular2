






export interface KeyValuePair {
    id: number;
    name: string;
}


export interface Contact {
    name: string;
    phone: string;
    email: string;
}

export interface SaveVehcile {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;

}


export interface Vehcile {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;

}