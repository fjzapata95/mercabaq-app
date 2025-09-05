export interface PendingOrderResponse {
    error: boolean
    data: DataResponse
    message: string
}

export interface DataResponse {
    total: number
    pages: number
    currentPage: number
    data: Order[]
}
  
export interface Order {
    id: number
    fecha: string
    estado: string
    montoTotal: string
    moneda: string
    estadoPago: string
    metodoPago: any
    clienteId: number
    direccionId: number
    comentario: string
    nombreReceptor: string
    calificado: boolean
    createdAt: string
    updatedAt: string
    deletedAt: any
    createdBy: number
    updatedBy: any
    deletedBy: any
    UserModel: UserModel
}
  
export interface UserModel {
    name: string
}

export interface OrderDetailResponse {
    error: boolean
    data: OrderDetail[]
    message: string
}

export interface OrderDetail {
    id: number
    pedidoId: number
    productoId: number
    nombreProducto: string
    cantidad: string
    precio: string
    subTotal: string
    sellerId: number
}

export interface OrderFilters {
    estado: string
    page: number
}

export interface OrderStatusResponse {
    error: boolean
    data: OrderStatus[]
    message: string
}

export interface OrderStatus {
    estado: string
    cantidad: string
}