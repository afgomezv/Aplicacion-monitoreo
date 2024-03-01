import mongoose from "mongoose";

interface ConnecttionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  static async connect(options: ConnecttionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      //console.log("Mongo connect!");
      return true;
    } catch (error) {
      throw error;
    }
  }
}
