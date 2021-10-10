import { Item } from "./items";
import { BoxList } from "./BoxList";

export interface Box {
    id: string,
    name: string,
    description: string,
    usage: string,
    contactperson: string | null,
    items?: Item[]
}

export interface BoxWithMissingItems {
    id: string,
    name: string,
    description: string,
    usage: string,
    contactperson: string | null,
    items?: BoxList[]
}