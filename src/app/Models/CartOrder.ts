import { Product } from "./Product";

export class Card {
    id: number;
    name: string;
    price: number;
    priceAfterdiscount: number;
    quantity: number;
    img: string;
    color: string;  // Change this to store color value instead of ID
    size: string;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.quantity = 1;
        // Assuming you want to use the first image's URL
        this.img = product.images.length > 0 ? product.images[0].imageUrl : '';
    }
}