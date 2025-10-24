export interface ProductsResponse {
    error: boolean
    data: Data
    message: string
}

export interface Data {
    total: number
    pages: number
    currentPage: number
    data: Product[]
}
  
export interface Product {
    id: number
    name: string
    image: string
    um: string
    freeShipping: boolean
    status: boolean
    seller: number
    stock: any
    price: string
    rating: any
    descripcion: string
    brand: number
    categoria: number
    nombrecategoria: string
    tipoenvio: string
    nombremarca: string
    UserModel: UserModel
    isFavorite: boolean
    reviewCount: any
    MiNegocioModel: {
        nombreMostrar: string
    },
    disponible: string
    vendedor: string
}
  
export interface UserModel {
    name: string
}

export interface ProductIdResponse {
    error: boolean
    data: Product
    message: string
}

export interface ImagesResponse {
    error: boolean
    data: Images
    message: string
}
  
export interface Images {
    producto: string
    images: any[]
}

export interface ProductCreateResponse {
    error: boolean
    data: Product
    message: string
}

export interface Props<T extends Object> {
    form: T;
    errorText: any;
    onChange: (value: any, field: keyof T) => void;
}