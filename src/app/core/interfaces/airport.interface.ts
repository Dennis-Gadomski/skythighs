export interface Airport {
    id: number;
    ident: string;
    type: string;
    name: string;
    latitude_deg: string;
    longitude_deg: string;
    elevation_ft: number;
    continent: string;
    iso_country: string;
    iso_region: string;
    municipality: string;
    scheduled_service: string;
    gps_code: string;
    iata_code: string | null;
    local_code: string | null;
    home_link: string | null;
    wikipedia_link: string | null;
    keywords: string | null;
}