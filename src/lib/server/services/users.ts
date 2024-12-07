'use server'

import { db } from "@/lib/db";
import { User } from "@/types/user";
import { UserTable } from "../db/schemas/user";

export const setUser = async (user: User) => {
    const userUpdated = {
        ...user,
        isMerchant: false
    }

    return db.insert(UserTable).values(userUpdated)
}
