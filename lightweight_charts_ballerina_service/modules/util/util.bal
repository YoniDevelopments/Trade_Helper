import ballerina/http;
//import ballerina/io;
import ballerina/lang.value;
import ballerina/regex;

# Check if the corresponding scope is available in the scopes list
#
# + ctx - Request Context
# + scope - Scope to be checked
# + return - `true` if the scope is available, `false` otherwise
public function authorize(http:RequestContext ctx, string scope) returns boolean {

    value:Cloneable| object {} scopes = ctx.get("scopes");
    if scopes is error {
        return false;
    }

    string[] scopeList = regex:split(scopes.toString(), " ");
    foreach string s in scopeList {
        if (s == scope) {
            return true;
        }
    }

    return false;
}
