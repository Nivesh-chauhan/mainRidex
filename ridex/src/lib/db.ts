import { Console } from "console"

import mongoose from "mongoose"
import { ClientPageRoot } from "next/dist/client/components/client-page"
import { clonePageVaryPathWithNewSearchParams } from "next/dist/client/components/segment-cache/vary-path"

const mongodbUrl = process.env.MONGODB_URL

if (!mongodbUrl) {
    throw new Error("db url not found!")
}

let cached = globalThis.mongooseConn
if (!cached) {
    cached = globalThis.mongooseConn = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cached.conn) {                                                                                           
        return cached.conn
    }



    if (!cached.promise) {
        cached.promise = mongoose.connect(mongodbUrl).then(c => c.connection)
    }

    try {
        const conn = await cached.promise
        
        return conn
    } catch (error) {
        console.log(error)
    }

}

export default connectDb