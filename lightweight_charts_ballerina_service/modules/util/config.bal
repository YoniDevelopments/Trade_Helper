// These values are set in `Config.toml` file.

// Issuer value that should be used to validate the JWT token
configurable string issuer = ?;
// Audience value that should be used to validate the JWT token
configurable string audience = ?;
// The URL of the JWKS endpoint
configurable string jwksUrl = ?;
// The port that the service should listen on
configurable int port = ?;

// The scopes for the alert service
configurable map<string> alertScopes = ?;

// The following function is used to get the issuer
// + return - The issuer
public function getIssuer() returns string {
    return issuer;
}

// The following function is used to get the audience
// + return - The audience
public function getAudience() returns string {
    return audience;
}

// The following function is used to get the JWKS URL
// + return - The JWKS URL
public function getJwksUrl() returns string {
    return jwksUrl;
}

// The following function is used to get the port
// + return - The port
public function getPort() returns int {
    return port;
}

// The following function is used to get the alert scopes
// + return - The alert scopes
public function getAlertScopes() returns map<string> {
    return alertScopes;
}