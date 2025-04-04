export interface CategoryType {
    id: number;
    modifiedBy: string;
    modifiedDate: string;
    name: string;
    createBy: string;
    createdDate: string;
}

export interface Category {
    id: number;
    modifiedBy: string;
    modifiedDate: string;
    name: string;
    categorytype: CategoryType[];
    createBy: string | null;
    createdDate: string | null;
}
