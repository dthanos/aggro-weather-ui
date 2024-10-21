export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    created_at: string;
}

export interface RemoteAPI {
    id: number;
    name: string;
    url: string;
    api_key: string;
    created_at: string;
}

export interface Forecast {
    id: number;
    step: forecastView;
    temperature: [];
    precipitation: [];
    datetime: [];
    location: Location;
    remote_api: RemoteAPI;
}

export type forecastView = 'Daily' | 'Hourly';
export type modalSize = 'small' | 'medium' | 'large';
