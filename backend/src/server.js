import { app } from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';


const startServer = async () => {
    try {

        await connectDB()

        app.listen(ENV.PORT, () => {
            console.log(`server is ranning at http://localhost:${ENV.PORT}`)
        })

    }catch(err) {
        console.error(err)
    }
}

startServer()