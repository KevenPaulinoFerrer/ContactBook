import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?appName=ContactBook`;

const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('ContactBook');
    console.log('Connected to MongoDB');
  }
  return db;
};

export const createContact = async contact => {
  const db = await connectDB();
  const collection = db.collection('contacts');

  const result = await collection.insertOne(contact);

  return result;
};

export const getContacts = async () => {
  const db = await connectDB();
  const collection = db.collection('contacts');

  const contacts = await collection.find({}).toArray();

  return contacts;
};

export const updateContact = async (id, updatedContact) => {
  const db = await connectDB();
  const collection = db.collection('contacts');

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedContact },
  );

  return result;
};

export const deleteContact = async id => {
  const db = await connectDB();
  const collection = db.collection('contacts');

  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });

  return result;
};
