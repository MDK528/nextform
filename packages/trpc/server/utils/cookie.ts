import type {CookieOptions, Request, Response} from "express"
import { TRPCContext } from "../context";

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 12 * ONE_MONTH;


const defualtCookieOptions: CookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: ONE_YEAR
};


export function setCookieFactory(res:Response){
    return function setCookie(name: string, value: string, opts: CookieOptions = defualtCookieOptions){
        res.cookie(name, value, opts);
    }
}

export function getCookieFactory(req:Request){
    return function getCookie(name: string){
        return req.cookies?.[name]
    }
}

export function clearCookieFactory(res:Response){
    return function clearCookie(name: string){
        res.clearCookie(name);
    }
}


const AUTH_COOKIE_NAME = "auth-token";

export function setAuthenticationCookie(ctx: TRPCContext, accessToken: string){
    ctx.setCookie(AUTH_COOKIE_NAME, accessToken)
}

export function getAuthenticationCookie(ctx: TRPCContext){
    return ctx.getCookie(AUTH_COOKIE_NAME)
}

export function clearAuthenticationCookie(ctx: TRPCContext){
    ctx.clearCookie(AUTH_COOKIE_NAME)
}