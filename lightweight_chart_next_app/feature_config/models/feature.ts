export interface FeatureScope {
    create: string[];
    view: string[];
    delete: string[];
    view_chart: string[]
}

export interface Feature {
    alert : FeatureScope;
}