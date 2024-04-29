window.config = {
    AuthorizationConfig: {
      BaseOrganizationUrl: "https://api.asgardeo.io/t/tradingwithyoni",
    },
    ApplicationConfig: {
      HostedUrl: "https://9d619970-c74c-4e5f-81c0-3ffbccb3b374.e1-us-cdp-2.choreoapps.dev",
      BackendUrl: "https://93c23e42-a48d-438d-bf33-cbbb0e00d42e-dev.e1-us-cdp-2.choreoapis.dev/trade-helper/chartsservice/trade-helper-service-194/v1",
      ClientId: "W1UqG03uWY39eND_gOb4UqJko1oa",
      ClientSecret: "Ujf1UgCkCh4iAdkNpSnofPY32ykRrb904mGCEOqRGAMa",
      APIScopes: ["openid", "email", "profile", "internal_login"],
    },
    Features: {
      Alert: {
        scopes: {
          create: ["alert:create"],
          view: ["alert:view"],
          delete: ["alert:delete"],
          view_chart: ["alert:view_chart"],
        },
      },
    },
  };