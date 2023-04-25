import type { NextApiRequest, NextApiResponse } from "next"; 
import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/prisma/client";

 
export default async function handler( 
    req: NextApiRequest, 
    res: NextApiResponse 
) { 
    if(req.method === "POST") { 
        const session = await getServerSession(req,res,authOptions) 
        if(!session?.user?.email)  
            return res.status(401).json({message: 'Please sign in to add an ingredient'}) 
 
        const ingredientName: string = req.body.ingredientName
        
        // Get user
        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        })

        // Check the ingredientName
        if(ingredientName.length > 250) 
            return res.status(403).json({ message: 'Please choose a shorter ingredient name' })
        if(ingredientName.length === 0)
            return res.status(403).json({ message:'Please do not leave this empty' })
        
        if(!prismaUser) {
            return res.status(401).json({message: 'cryptic issue.'})
        }
        // Create the Ingredient Object
        try {
            const result = await prisma.ingredient.create({
                data: {
                    ingredientName: ingredientName,
                    userId: prismaUser.id,
                    unitName: "oz",
                    caloriesPerUnit: 696969

                }
            })
            res.status(200).json(result)
        } catch (err) {
            console.log("ingredient error")
            console.log(err)
            res.status(403).json({err: 'Error has occured while creating this ingredient'})
        }
    } 
    if(req.method === "GET") {
        return res.status(200)
    }
} 