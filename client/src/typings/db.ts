export interface IBook {
    stock: number;
    id: number;
    title: string;
    price: number;
    author: string;
    publisher: string;
    isbn: string;
    imageFileName: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}