import mongoose from "mongoose";

const url = process.env.MONGO as string;
// Connect to MongoDB and perform operations
let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    try {
      await mongoose.connect(url, { maxPoolSize: 10 });
      isConnected = true;
      console.log("Connected successfully to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }
}

async function getFlexibleModel(database: string) {
  await connectToDatabase();
  let FlexibleModel;
  try {
    FlexibleModel = mongoose.model(database);
  } catch {
    const flexibleSchema = new mongoose.Schema({}, { strict: false });
    FlexibleModel = mongoose.model(database, flexibleSchema);
  }
  return FlexibleModel;
}

export async function saveBulkData(dataArray: any[], database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Use insertMany to save an array of objects
    const docs = await FlexibleModel.insertMany(dataArray, { ordered: false });
    console.log("Inserted documents:", docs);
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function saveDataById(data: any, database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Use the provided _id from another table
    //@ts-ignore
    await FlexibleModel.findOneAndUpdate({ _id: data._id }, data, { new: true, upsert: true });
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function findAndUpdateData(query: any, updateData: any, database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Find the document by query and update it
    //@ts-ignore
    const updatedDocument = await FlexibleModel.findOneAndUpdate(query, updateData, { new: true, upsert: true });
    console.log("Updated document:", updatedDocument);
    return updatedDocument;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function saveData(data: any, database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Create a new document and save it to the database
    const newDocument = new FlexibleModel(data);
    const doc = await newDocument.save();
    console.log("Inserted document:", doc);
    return doc;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getData(database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Retrieve documents from the database and convert _id to string
    //@ts-ignore
    const docs = await FlexibleModel.find({}).lean();
    const docsAsString = docs.map((doc: any) => ({ ...doc, _id: doc._id.toString() }));
    return docsAsString;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function deleteAllData(database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Delete all documents from the database
    await FlexibleModel.deleteMany({});
    console.log("All documents in", database, "have been deleted");
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function deleteDataById(database: string, id: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Delete a document from the database by its string id
    //@ts-ignore
    const doc = await FlexibleModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    if (doc) {
      console.log("Document with id", id, "has been deleted");
    } else {
      console.log("Document with id", id, "not found");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getDataById(database: string, id: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Retrieve a document from the database by its string id
    //@ts-ignore
    const doc = await FlexibleModel.findById(id);
    if (doc) {
      console.log("Document with id", id, "found");
      return doc;
    } else {
      console.log("Document with id", id, "not found");
      return null;
    }
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

export async function getDataByColumnName(database: string, columnName: string, columnValue: any) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Retrieve documents from the database by a specific column name and value
    //@ts-ignore
    const docs = await FlexibleModel.find({ [columnName]: columnValue });
    if (docs.length > 0) {
      console.log(`Documents with ${columnName} = ${columnValue} found`);
      return docs;
    } else {
      console.log(`No documents with ${columnName} = ${columnValue} found`);
      return [];
    }
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}
export async function getDataByQuery(database: string, query: any) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Retrieve documents from the database by a specific column name and value
    //@ts-ignore
    const docs = await FlexibleModel.find(query);
    if (docs.length > 0) {
      // console.log(`Documents with ${columnName} = ${columnValue} found`);
      return docs;
    } else {
      // console.log(`No documents with ${columnName} = ${columnValue} found`);
      return [];
    }
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}
export async function getDataByColumnNamePaginated(database: string, columnName: any, page: number, limit: number) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    // Retrieve documents from the database by a specific column name and value with pagination
    //@ts-ignore
    const docs = await FlexibleModel.find(columnName)
      .skip((page - 1) * limit)
      .limit(limit);
    if (docs.length > 0) {
      console.log(`Documents with found on page ${page}`);
      return docs;
    } else {
      console.log(`No documents with found on page ${page}`);
      return [];
    }
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}
export async function getTableSize(database: string) {
  try {
    const FlexibleModel = await getFlexibleModel(database);
    const count = await FlexibleModel.countDocuments();
    return count;
  } catch (err) {
    console.error("Error:", err);
    return 0;
  }
}
