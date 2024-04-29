import { FeatureConfig } from "@/feature_config/featureConfig";
import { NavBarItem, ProfileItem } from "../../models/navBar";

export const navBarItems: NavBarItem[] = [
    {
        key: 'View Chart',
        name: 'View Chart',
        description: 'This is the page for viewing charts',
        icon: 'CandlestickChart',
        requiredScopes: [],
        path: '/view_chart'
    },
    {
        key: 'delete_alert',
        name: 'Delete Alert',
        description: 'Delete Alert',
        icon: 'Delete',
        requiredScopes: FeatureConfig.features.alert.delete,
        path: '/delete_alert'
    },
    {
        key: 'view_alert',
        name: 'View Alert',
        description: 'View all Alert',
        icon: 'InsertDriveFile',
        requiredScopes: FeatureConfig.features.alert.view,
        path: '/view_alert'
    },
    {
        key: 'create_alert',
        name: 'Create Alert',
        description: 'Create a new Alert',
        icon: 'AddAlert',
        requiredScopes: FeatureConfig.features.alert.create,
        path: '/create_alert'
    }
];

export const profileItems: ProfileItem[] = [ 
    {
        key: 'sign_out',
        name: 'Sign Out'
    }
];
