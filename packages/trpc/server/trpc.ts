import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";
import { getAuthenticationCookie } from "./utils/cookie";
import { userService } from "./services";

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

export const authenticatedProcedure = tRPCContext.procedure.use(async optiopns => {
  const { ctx } = optiopns

  const userToken = getAuthenticationCookie(ctx)
  if(!userToken) throw new Error('User is not logged in');
  
  try {
    const { id } = await userService.verifyAndDecodeToken(userToken)
    return optiopns.next({
      ctx:{
        ...ctx,
        user: { id }
      }
    })
  } catch (error) {
    throw new Error('Inavlid or Expired token')
  }
})