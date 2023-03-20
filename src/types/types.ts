export interface WeatherCode {
  code: Number;
  letter: String;
  condition: String;
  conditionDutch: String;
}
export interface PlaceholderType {}
export interface sourceCategory {
  category: string;
  sources: Array<string>;
}

export interface sourceToggle {
  enabled: boolean;
  sources: sourceArray[];
  category: string;
}

export interface sourceArray {
  name: string;
  enabled: boolean;
}
