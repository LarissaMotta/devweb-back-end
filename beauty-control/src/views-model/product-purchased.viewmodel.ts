import { ProductWorkflowViewModel } from "./product-workflow.viewmodel";

export interface ProductPurchasedViewModel {
    id: number;
    name: string;
    products: ProductWorkflowViewModel[];
}