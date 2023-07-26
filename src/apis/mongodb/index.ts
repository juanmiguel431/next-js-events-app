import {
  Collection,
  Db,
  Filter, FindCursor, FindOptions, InsertManyResult,
  InsertOneResult,
  MongoClient,
  OptionalUnlessRequiredId,
  ServerApiVersion, WithId, Document
} from 'mongodb';

export default class MongoDbClient<T extends Document = any> {
  private readonly uri = "mongodb+srv://juanmiguel431:hMasqJdJALJF4uns@cluster0.3polqrh.mongodb.net/?retryWrites=true&w=majority";
  private readonly dbName = 'next-events';
  private readonly collection: Collection<T>;
  private db: Db;
  private client: MongoClient;

  constructor(collection: string) {
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(collection);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async close(): Promise<void> {
    await this.client.close();
  }

  public async insert(item: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(item);
  }

  public async insertMany(items: OptionalUnlessRequiredId<T>[]): Promise<InsertManyResult<T>> {
    return this.collection.insertMany(items);
  }

  public async find(filter: Filter<T>, options?: FindOptions): Promise<FindCursor<WithId<T>>> {
    return this.collection.find(filter, options);
  }

  public async findAll(): Promise<FindCursor<WithId<T>>> {
    return this.collection.find();
  }
}
