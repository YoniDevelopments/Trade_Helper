//import ballerina/io;
import lightweight_charts_ballerina_service.util;

import ballerina/http;
import ballerina/uuid;


const string apiKey = "demo";
const string symbol = "IBM";
const string interval = "60min";

// Define the Alert type
public type Alert record {
    readonly string id;
    string symbol;
    float price;
};

// Create an in-memory table to store the alerts
public table<Alert> key(id) alertsTable = table [];

// Define the API listener
public listener http:Listener api = new (util:getPort());

// Define the API service
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: true,
        maxAge: 84900
    }
}
service http:InterceptableService / on api {

    public function createInterceptors() returns AuthInterceptor {
        return new AuthInterceptor();
    }

    ///////////////////
    resource function get getIntradayStockPrice(http:RequestContext ctx, string symbol, string interval) returns http:Response|error {
        boolean isAuthorized = util:authorize(ctx, util:getAlertScopes().get("view_chart"));

        if !isAuthorized {
            return error("User is not authorized to view intraday stock price");
        } else {
            string url = "https://www.alphavantage.co/query?" +
                        "function=TIME_SERIES_INTRADAY&" +
                        "symbol=" + symbol + "&" +
                        "interval=" + interval + "&" +
                        "apikey=" + apiKey;
            http:Client alphaVantageClient = check new (url);
            http:Response response = check alphaVantageClient->get("");
            return response;
        }
    }
    resource function post alerts(http:RequestContext ctx, @http:Payload Alert payload) returns Alert|error {
        boolean isAuthorized = util:authorize(ctx, util:getAlertScopes().get("create"));

        if !isAuthorized {
            return error("User is not authorized to create alerts");
        } else {
            string uuid = uuid:createType4AsString();
            Alert alert = {
                id: uuid,
                symbol: payload.symbol,
                price: payload.price
            };
            alertsTable.add(alert);
            return alert;
        }
    }

    resource function get alerts(http:RequestContext ctx) returns Alert[]|error {
        boolean isAuthorized = util:authorize(ctx, util:getAlertScopes().get("view"));

        if !isAuthorized {
            return error("User is not authorized to view alerts");
        } else {
            Alert[] response = [];
            foreach var alert in alertsTable {
                response.push(alert);
            }
            return response;
        }
    }

    resource function delete alerts(http:RequestContext ctx, @http:Payload string id) returns string|error {
        boolean isAuthorized = util:authorize(ctx, util:getAlertScopes().get("delete"));

        if !isAuthorized {
            return error("User is not authorized to delete alerts");
        } else {
            // Check if the alert with the specified ID exists
            foreach var alert in alertsTable {
                if (alert.id == id) {
                    // If the alert exists, remove it
                    Alert? removedAlert = alertsTable.removeIfHasKey(id);
                    if (removedAlert is Alert) {
                        return "Alert deleted successfully";
                    }
                }
            }
            // If no alert with the specified ID is found, return an error
            return error("Alert not found");
        }
    }
}

