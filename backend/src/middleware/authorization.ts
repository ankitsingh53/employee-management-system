import type { GraphQLContext, AuthUser } from "../types/context.js";

export const requireAuth = (context:GraphQLContext):AuthUser=>{
    if(!context.user){
        throw new Error("Unauthorized");
    }
    return context.user;
};

export const requireAdmin =(context:GraphQLContext):AuthUser=>{
    const user = requireAuth(context);
    if(user.role !== "ADMIN"){
        throw new Error("Forbidden");
    }

    return user;
};