const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, 'database');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

/**
 * Get the path for a given collection JSON file
 */
function getCollectionPath(collectionName) {
  return path.join(DB_DIR, `${collectionName}.json`);
}

/**
 * Reads data from a collection JSON file
 */
async function readCollection(collectionName) {
  const filePath = getCollectionPath(collectionName);
  try {
    if (!fs.existsSync(filePath)) {
      await writeCollection(collectionName, []);
      return [];
    }
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading collection "${collectionName}":`, error);
    return [];
  }
}

/**
 * Writes data to a collection JSON file atomically
 */
async function writeCollection(collectionName, data) {
  const filePath = getCollectionPath(collectionName);
  const tempPath = `${filePath}.tmp`;
  try {
    const jsonString = JSON.stringify(data, null, 2);
    // Write to a temporary file first
    await fs.promises.writeFile(tempPath, jsonString, 'utf8');
    // Rename temporary file to target file (atomic on POSIX, and generally safe on Windows)
    await fs.promises.rename(tempPath, filePath);
  } catch (error) {
    console.error(`Error writing collection "${collectionName}":`, error);
    // Cleanup temp file if it exists
    if (fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch (_) {}
    }
    throw error;
  }
}

const LocalDB = {
  /**
   * Get all documents in a collection
   */
  async getAll(collectionName) {
    return await readCollection(collectionName);
  },

  /**
   * Find documents that match a query object
   */
  async find(collectionName, query = {}) {
    const items = await readCollection(collectionName);
    return items.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  /**
   * Get a single document by ID
   */
  async getById(collectionName, id) {
    const items = await readCollection(collectionName);
    // Coerce both to string to be safe on types
    return items.find(item => String(item.id) === String(id)) || null;
  },

  /**
   * Insert a new document into a collection
   */
  async insert(collectionName, doc) {
    const items = await readCollection(collectionName);
    
    // Auto-increment numeric ID
    const maxId = items.reduce((max, item) => {
      const numId = parseInt(item.id, 10);
      return !isNaN(numId) && numId > max ? numId : max;
    }, 0);
    
    const newDoc = {
      id: maxId + 1,
      ...doc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.push(newDoc);
    await writeCollection(collectionName, items);
    return newDoc;
  },

  /**
   * Update an existing document by ID
   */
  async update(collectionName, id, updates) {
    const items = await readCollection(collectionName);
    const index = items.findIndex(item => String(item.id) === String(id));
    if (index === -1) {
      throw new Error(`Document with ID ${id} not found in collection ${collectionName}`);
    }

    const updatedDoc = {
      ...items[index],
      ...updates,
      id: items[index].id, // Prevent ID changes
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedDoc;
    await writeCollection(collectionName, items);
    return updatedDoc;
  },

  /**
   * Delete a document by ID
   */
  async delete(collectionName, id) {
    const items = await readCollection(collectionName);
    const index = items.findIndex(item => String(item.id) === String(id));
    if (index === -1) {
      return false;
    }
    items.splice(index, 1);
    await writeCollection(collectionName, items);
    return true;
  }
};

module.exports = LocalDB;
