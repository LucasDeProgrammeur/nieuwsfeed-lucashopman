export interface WeatherCode {
    code: Number;
    letter: String;
    condition: String;
    conditionDutch: String;
}
export interface PlaceholderType {
    
}
export interface sourceCategory {
    category: string;
    sources: Array<string>
}

export interface sourceToggle {
    source: string,
    enabled: boolean
}