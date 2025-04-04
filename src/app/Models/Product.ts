export class Image {
    id: number;
    name: string;
    imageUrl: string;
    colorId: number;
    imageId: number | null;
}

export class Product {
    id: number;
    name: string;
    price: number;
    discount: number;
    priceAfterdiscount: number;
    slug:string;
    images: {
        id: number;
        imageUrl: string;
        colorId: number; // Include colorId here
    }[];
}

export class ProductReturn {
    name: string;
    price: number;
    priceAfterdiscount: number;
    discount: number;
    categoryTypeName: string;
    metaTitle:string;
    metaDescription:string;
    slug:string;
    image: Image[];
}

export interface ProductReturns {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    priceAfterDiscount: number;
    images: { id: number; imageUrl: string; colorId: number }[];
    productSizes: { stockQuantity: number; colorId: number; sizeValue: string; colorName: string }[];
}


export interface ProductDetails {
    id: number;
    name: string;
    price: number;
    priceAfterDiscount: number;
    description: string;
    productSizes: ProductSize[];
    images: ProductImage[];
}

export interface ProductSize {
    sizeValue: string;
    stockQuantity: number;
    colorId: number;
    colorValue: string;
}

export interface ProductImage {
    imageUrl: string;
    colorId: number;
}


export class productSizes {
    id: number;
    colorId: number;
    colorValue: string;
    colorName: string;
    sizes: sizes[];
}

export class sizes {
    sizeId: number;
    stockQuantity: number;
    sizeValue: string;
}

export class Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export class PaginatedResponseProduct {
    content: ProductReturn[];
    page: Page;
}