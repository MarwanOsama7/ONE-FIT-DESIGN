export interface Client {
    username: string;
    email: string;
    phoneNumber: string;
    phoneNumberOptional: string;
    address: string;
    city: string;
}

export interface RequestOrder {
    code: string;
    note: string;
    cityOfOrder: string;
    totalPrice: number;
    totalQuantity: number;
    promoCode:string;
}

export interface Item {
    name: string;
    colorName: string;
    img: string;
    size: string;
    price: number;
    quantity: number;
}

export interface PurchaseRequest {
    client: Client;
    requestOrder: RequestOrder;
    items: Item[];
}

export interface Stage {
    label: string;
    status: number;
    isActive: boolean;
}