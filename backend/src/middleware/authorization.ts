export const requireAuth = (context:any)=>{
    if(!context.user){
        throw new Error("Unauthorized");
    }
    return context.user;
};

export const requireAdmin =(context:any)=>{
    const user = requireAuth(context);
    if(user.role !== "ADMIN"){
        throw new Error("Forbidden");
    }

    return user;
};