import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers"


export async function POST(req){
    const wh = new Webhook(process.env.SIGNING_SECRET)
    const headerPayload = await hearders()
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-signature": headerPayload.get("svix-signature"),
    };
    //Get the playload and verify it

    const playload = await req.json();
    const body = JSON.stringify(payload);
    const {data, type} = wh.verify(body, svixheaders)

    // prepare the user data to be saved in the data base
    const userData ={
       __id : data.id,
       email: data.email_address[0].email_address,
       name: `${data.first_name} ${data.last_name}`,
       image: data.image_url, 

    };
    await connectDB();

    switch (type){
        case 'user.created':
            await User.create(userData)
            break;

        case'user.updated':
            await User.findByUdAndUpdat(data.id , userData)
            break;
        
        case 'user.deleted':
            await User.findByIdAndDelete(data.id)
            break;
        
        default:
            break;
        
    }
    return NextRequest.json({message: "Event received"});

}