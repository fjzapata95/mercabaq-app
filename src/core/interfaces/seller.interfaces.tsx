export interface SellerResponse {
    error: boolean
    data: Result
    message: string
}
  
export interface Result {
    total: number
    pages: number
    currentPage: number
    data: Seller[]
}
  
export interface Seller {
    nombreRazonSocial: string
    nombreMostrar: string
    numeroDocumento: string
    user: number
    TipoDocumentoModel: { nombre: string }
    TipoPersonaModel: { nombre: string }
    nombretipodoc: string
    nombretipopers: string
}