import { Category } from "src/enums/category.enum";

export interface ProductWorkflowViewModel {
    id: number;
    name: string;
    category: Category;
    quantity: number;
}