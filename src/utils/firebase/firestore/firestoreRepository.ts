import { DocumentData, getFirestore } from 'firebase-admin/firestore'
import { v4 as uuidv4 } from 'uuid';

const firestoreDB = getFirestore();

export class FirestoreRepository {
  constructor(private collection: string) {}
  async getById<T>(id: string): Promise<T | undefined> {
    const snapshot = await firestoreDB.collection(this.collection).doc(id).get();
    if (!snapshot.exists) return;
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as T;
  }

  async getDocs<T>(fieldSelects: Array<string> = []): Promise<Array<T>> {
    const snapshot = await firestoreDB.collection(this.collection).select(...fieldSelects).get();
    const docs: Array<T> = [];
    if (snapshot.empty) {
      return [];
    } 
    snapshot.forEach((doc) => {
      docs.push(doc.data() as T);
    });
    return docs;
  }

  async createDoc<T>(doc: DocumentData): Promise<T> {
    await firestoreDB.collection(this.collection).doc(uuidv4()).set(doc);
    return doc as T;
  }

  async updateDoc<T>(id: string, docData: Partial<T>): Promise<Partial<T>> {
    await firestoreDB.collection(this.collection).doc(id).set(docData);
    return docData;
  }
}
