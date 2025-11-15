import { aj } from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { Request,Response } from "express";

export const arcjetProtection  = async(req : Request,res: Response,next: Function)=> {
       try{
        const decision = await aj.protect(req);

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
            res.status(429).json({ error: "Rate limit exceeded, ytry again" });

        
    }else if(decision.reason.isBot()) {
        return res.status(403).json({ error: "Access denied for bots" });
        
        }else {
            return res.status(403).json({ error: "Access denied by Arcjet security policy" });

        }
    }
    //check for spoofed bots - means acts like a human but is a bot
    if(decision.results.some(isSpoofedBot)) {
        return res.status(403).json({ error: "Access denied for spoofed bots",
            message:" Detected as spoofed bot "
         });
    }
    next();


       }catch(err){
        console.error("Arcjet middleware error:", err);
        next();
       }
}