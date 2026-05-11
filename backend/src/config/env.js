import { env as loadEnv } from 'custom-env'
import { z } from 'zod'


process.env.APP_STAGE = process.env.APP_STAGE ?? "dev";

const isDev = process.env.APP_STAGE === "dev";
const isProduction = process.env.APP_STAGE === "Production";
const isTest = process.env.APP_STAGE === "test";

if(isDev) {
    loadEnv('dev')
}else {
    loadEnv('test')
}


const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),

    APP_STAGE: z
        .enum(['dev', 'production', 'test'])
        .default('dev'),
    
    PORT: z.coerce.number().positive().default(3000),
    
    MONGO_URI: z.string().refine(
        (val) => val.startsWith('mongodb://') || val.startsWith('mongodb+srv://'),
        {
            message: 'URL most start with mongodb:// or mongodb+srv://',
            path: ['MONGO_URI']
        }
    ),

    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default("7d"),
    BCRYPT_SALT_ROUNDS: z.coerce.number().positive().default(10)
})

const env = envSchema.safeParse(process.env);

if(!env.success) {
    console.error("Invalid environment variables:", env.error.format());
    process.exit(1)
}


export const ENV = env.data;
 