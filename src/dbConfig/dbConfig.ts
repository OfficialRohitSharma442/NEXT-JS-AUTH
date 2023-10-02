import mongoose, { connection } from 'mongoose';
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("mongodb connected");
        })
        connection.on('error', (error) => {
            console.log(`mongodb connection error plz check mongodb running properly or not ${error}`);
        })
    } catch (error) {
        console.error(`Somthing went worng please check ${error}`)
    }
}