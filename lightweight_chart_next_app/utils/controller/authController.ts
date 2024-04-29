import { signIn, signOut } from "next-auth/react"

export class AuthController {

    private constructor() {};

    public static signIn = async (): Promise<void> => {
        signIn("lightweight_chart_and_alert_app", { callbackUrl: `/view_chart` }) 
    }

    public static signOut = async (): Promise<void> => {
        signOut({ callbackUrl: `/` })
    }
}