export interface SimpleRequest {
    status: string;
    code: string;
    message: string;
    fullMessage: string;
    statusResult: boolean;
    data: SimpleData[];
}

export interface SimpleData {
    id: number;
    etiqueta: string;
    nombre: string;
}
