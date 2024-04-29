import config from '../config.json';
import { Feature } from './models/feature';
 
export class FeatureConfig {
  
    private constructor() {};

    public static getBaseOrganizationUrl = (): string => config.AuthorizationConfig.BaseOrganizationUrl;

    public static getBaseHostedUrl = (): string => config.ApplicationConfig.HostedUrl;

    public static getClientId = (): string => config.ApplicationConfig.ClientId;

    public static getClientSecret = (): string => config.ApplicationConfig.ClientSecret;

    public static getScopes = (): string[] => {

        const apiScopes: string[] = config.ApplicationConfig.APIScopes;
        const alertViewScopes: string[] = config.Features.Alert.scopes.view;
        const alertCreateScopes: string[] = config.Features.Alert.scopes.create;
        const alertDeleteScopes: string[] = config.Features.Alert.scopes.delete;
        const alertViewChartScopes: string[] = config.Features.Alert.scopes.view_chart;

        return [...apiScopes, ...alertViewScopes, ...alertCreateScopes, ...alertDeleteScopes, ...alertViewChartScopes];
    }

    public static getBackendUrl = (): string => config.ApplicationConfig.BackendUrl;

    public static features: Feature = {
        alert: config.Features.Alert.scopes
    }
}
