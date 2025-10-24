export interface CategoryResponse {
    message: string;
    data: Category[];
    error: boolean
}

export interface Category {
    id: number;
    title: string;
    image: string;
    status: boolean;
    name: string;
    count?: number | null;
}