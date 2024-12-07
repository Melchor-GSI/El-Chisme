import { setUser } from "@/lib/server/services/users"
import { User } from "@/types/user"

export async function POST(req: Request) {
    const payload = await req.json()
    const data = payload.data

    const user: User = {
        clerkId: data.id,
        username: data.username,
        email: data.email
    }

    await setUser(user)
    
    return Response.json({message: `Updated user`})
}
