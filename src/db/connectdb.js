'use server'





import mongoose from 'mongoose'


export const connectToDatabase = async (DATABASE_URL = process.env.DATABASE_URL) => {
    await mongoose.connect(DATABASE_URL).then(() => {
        console.log('connect to database');
    }).catch(() => { console.log('error connecting db'); });
}
export default connectToDatabase;