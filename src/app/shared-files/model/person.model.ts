export interface IPerson {
    name: string;
    country: [
        {
            country_id: string,
            probability: number
        }
    ];
}