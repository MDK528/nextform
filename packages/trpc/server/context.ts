import type { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { clearCookieFactory, getCookieFactory, setCookieFactory } from "./utils/cookie";

export interface TRPCCtxUser{
    id: string
}

export interface TRPCContext {
    setCookie: ReturnType<typeof setCookieFactory>,
    getCookie: ReturnType<typeof getCookieFactory>,
    clearCookie: ReturnType<typeof clearCookieFactory>,
    user?: TRPCCtxUser
}

export async function createContext({req, res}: CreateExpressContextOptions): Promise<TRPCContext> {

    const ctx: TRPCContext = {
        setCookie: setCookieFactory(res),
        getCookie: getCookieFactory(req),
        clearCookie: clearCookieFactory(res),
        user: undefined
    }

    return ctx;
}
export type Context = Awaited<ReturnType<typeof createContext>>;
