export interface PQRResponse {
    error: boolean
    data: PQR[]
    message: string
}

export interface PQR {
	id: string;
	fechaCreacion: string;
	tipo: string;
	descripcion: string;
	estado: string;
	// comentarios: Comentario[];
}