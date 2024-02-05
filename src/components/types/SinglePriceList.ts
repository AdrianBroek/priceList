export interface SinglePriceList {
    id: number;
    title: string;
    weight: number;
    height: number;
    width: number;
    depth: number;
    quantity: number;
    [key: string]: number | string;
}

export interface SinglePriceListArea extends SinglePriceList {
    area: number;
    [key: string]: number | string;
}