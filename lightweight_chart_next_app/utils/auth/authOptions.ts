// import { FeatureConfig } from '@/feature_config/featureConfig';
// import { NextAuthOptions } from 'next-auth';

// /**
//  * Provider options for Asgardeo.
//  */
// export const asgardeoProviderOptions: NextAuthOptions = {

//     callbacks: {
//         async jwt({ token, account }) {

//             if (account) {
//                 token.access_token = account?.access_token;
//                 token.id_token = account?.id_token;
//                 token.scope = account?.scope;
//             }

//             return token;
//         },
//         async session({ session, token, user }) {
                
//             session.user = user;
//             session.accessToken = token.access_token;
//             session.idToken = token.id_token;
//             session.scopes = token.scope?.split(' ');
            
//             return session;
//         }
//     },
//     cookies: {
//         pkceCodeVerifier: {
//             name: "next-auth.pkce.code_verifier",
//             options: {
//                 httpOnly: true,
//                 sameSite: "none",
//                 path: "/",
//                 secure: true,
//             },
//         },
//     },
//     debug: true,
//     providers: [
//         {
//             authorization: {
//                 params: {
//                     scope: FeatureConfig.getScopes().join(' ')
//                 }
//             },
//             clientId: FeatureConfig.getClientId(),
//             clientSecret: FeatureConfig.getClientSecret(),
//             id: 'lightweight_chart_and_alert_app',
//             name: 'lightweight_chart_and_alert_app',
//             profile(profile) {

//                 return {
//                     id: profile.sub
//                 };
//             },
//             type: 'oauth',
//             checks: ["pkce"],
//             userinfo: `${FeatureConfig.getBaseOrganizationUrl()}/oauth2/userinfo`,
//             wellKnown: `${FeatureConfig.getBaseOrganizationUrl()}/oauth2/token/.well-known/openid-configuration`
//         }
//     ],
//     secret: process.env.SECRET
// };

