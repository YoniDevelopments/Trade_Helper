import ballerina/http;
import ballerina/jwt;
import ballerina/io;
import lightweight_charts_ballerina_service.util;

jwt:ValidatorConfig validatorConfig = {
    issuer: util:getIssuer(),
    audience: util:getAudience(),
    clockSkew: 60,
    signatureConfig: {
        jwksConfig: {
            url: util:getJwksUrl()
        }
    }
};

service class AuthInterceptor {
    *http:RequestInterceptor;
    resource function 'default [string... path](http:RequestContext ctx, http:Request req, @http:Header string? authorization) returns http:NextService|http:Unauthorized|error? {

        string? authHeader = authorization;
        if authHeader is () && req.method.equalsIgnoreCaseAscii(http:OPTIONS) {
            return ctx.next();
        }
        if authHeader is () || !authHeader.startsWith("Bearer "){
            return <http:Unauthorized> {
                body: "Missing or invalid Authorization header."
            } ;
        }

        io:println(authHeader);
        string token = authHeader.substring(7);
        jwt:Payload|error result = jwt:validate(token, validatorConfig);

        io:println(result);

        if result is error {
            return <http:Unauthorized> {
                body: "You are unauthorized to access this resource."
            } ;
        }

        string userId = result.get("sub").toString();
        string scopes = result.get("scope").toString();

        io:println(scopes);

        ctx.set("scopes", scopes);
        ctx.set("userId", userId);

        return ctx.next();
    }
}