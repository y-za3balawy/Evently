import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;



let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'Evently',
    bufferCommands: false,
    
  }).then(()=>console.log("Db is connected")
  ).catch(()=>console.log("Check Db Connection")
  )

  cached.conn = await cached.promise;
  console.log('connected')

  return cached.conn;
}