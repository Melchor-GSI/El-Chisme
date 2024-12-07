import { db } from "@/lib/db";
import { User } from "@/types/user"
import { usersTable } from "../db/schemas";

export const setUser = async (user: User) => {
    const userUpdated = {
        ...user,
        isMerchant: false
    }

    return db.insert(usersTable).values(userUpdated)
}
