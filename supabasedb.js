const { createClient } = require('@supabase/supabase-js');

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Derive default URL from publishable key if SUPABASE_URL isn't explicitly set
// Key: sb_publishable_SNz3ZbvVsnJxdcjWg17M4A_W9XAN6O7 -> Project Ref: SNz3ZbvVsnJxdcjWg17M4A
const DEFAULT_PROJECT_REF = 'SNz3ZbvVsnJxdcjWg17M4A';
const DEFAULT_SUPABASE_URL = `https://${DEFAULT_PROJECT_REF}.supabase.co`;

const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_SNz3ZbvVsnJxdcjWg17M4A_W9XAN6O7';

if (!supabaseUrl) {
  console.error('[SUPABASE] Warning: SUPABASE_URL is not set.');
}

console.log(`[SUPABASE] Initializing connection to: ${supabaseUrl}`);
const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseDB = {
  /**
   * Get all documents in a collection
   */
  async getAll(collectionName) {
    try {
      const { data, error } = await supabase
        .from(collectionName)
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return (data || []).map(r => {
        if (collectionName === 'users') {
          return { id: r.id, email: r.email, ...r.data };
        }
        return { id: r.id, ...r.data };
      });
    } catch (error) {
      console.error(`[SUPABASE ERROR] getAll failed for collection "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * Find documents that match a query object
   */
  async find(collectionName, query = {}) {
    try {
      const items = await this.getAll(collectionName);
      return items.filter(item => {
        for (const key in query) {
          if (String(item[key]).toLowerCase() !== String(query[key]).toLowerCase()) {
            return false;
          }
        }
        return true;
      });
    } catch (error) {
      console.error(`[SUPABASE ERROR] find failed for collection "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * Get a single document by ID
   */
  async getById(collectionName, id) {
    try {
      const { data, error } = await supabase
        .from(collectionName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) return null;

      if (collectionName === 'users') {
        return { id: data.id, email: data.email, ...data.data };
      }
      return { id: data.id, ...data.data };
    } catch (error) {
      console.error(`[SUPABASE ERROR] getById failed for collection "${collectionName}" (ID: ${id}):`, error);
      throw error;
    }
  },

  /**
   * Insert a new document into a collection
   */
  async insert(collectionName, doc) {
    try {
      let insertRow = {};
      const timestamp = new Date().toISOString();

      if (collectionName === 'users') {
        const { email, ...rest } = doc;
        insertRow = {
          email: String(email).toLowerCase().trim(),
          data: {
            ...rest,
            createdAt: doc.createdAt || timestamp,
            updatedAt: doc.updatedAt || timestamp
          }
        };
      } else {
        const { id, ...rest } = doc; // Ignore user-supplied ID since PostgreSQL handles it
        insertRow = {
          data: {
            ...rest,
            createdAt: doc.createdAt || timestamp,
            updatedAt: doc.updatedAt || timestamp
          }
        };
      }

      const { data, error } = await supabase
        .from(collectionName)
        .insert([insertRow])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (collectionName === 'users') {
        return { id: data.id, email: data.email, ...data.data };
      }
      return { id: data.id, ...data.data };
    } catch (error) {
      console.error(`[SUPABASE ERROR] insert failed for collection "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * Update an existing document by ID
   */
  async update(collectionName, id, updates) {
    try {
      const existing = await this.getById(collectionName, id);
      if (!existing) {
        throw new Error(`Document with ID ${id} not found in collection ${collectionName}`);
      }

      // Merge updates, removing the id from the stored data body
      const merged = { ...existing, ...updates };
      delete merged.id;
      merged.updatedAt = new Date().toISOString();

      let updateRow = {};
      if (collectionName === 'users') {
        const { email, ...rest } = merged;
        updateRow = {
          email: String(email || existing.email).toLowerCase().trim(),
          data: rest
        };
      } else {
        updateRow = {
          data: merged
        };
      }

      const { data, error } = await supabase
        .from(collectionName)
        .update(updateRow)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (collectionName === 'users') {
        return { id: data.id, email: data.email, ...data.data };
      }
      return { id: data.id, ...data.data };
    } catch (error) {
      console.error(`[SUPABASE ERROR] update failed for collection "${collectionName}" (ID: ${id}):`, error);
      throw error;
    }
  },

  /**
   * Delete a document by ID
   */
  async delete(collectionName, id) {
    try {
      const { error } = await supabase
        .from(collectionName)
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error(`[SUPABASE ERROR] delete failed for collection "${collectionName}" (ID: ${id}):`, error);
      return false;
    }
  }
};

module.exports = SupabaseDB;
