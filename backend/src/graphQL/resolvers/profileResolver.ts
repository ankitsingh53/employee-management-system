import {getProfile} from '../../services/profileService.js'
export const profileResolver = {
    Query : {
        viewProfile: async (parent:any, args:any)=>{
        const id = args.id;
        return await getProfile(id)
    }
 }
    
}