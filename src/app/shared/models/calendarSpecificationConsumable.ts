import { Consumable } from "./consumable";
import { Specification } from "./specification";

export interface CalendarSpecificationConsumable {
    id: string;
    specificationId: string;
    consumableId: string;
    active: boolean;
    name: string;
    value: number;
    specification: Specification
    consumable: Consumable;
}