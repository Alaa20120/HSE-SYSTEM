const { createClient } = require('@supabase/supabase-js');

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Derive default URL from project reference
const DEFAULT_PROJECT_REF = 'udzvthlflcwnziplkqty';
const DEFAULT_SUPABASE_URL = `https://${DEFAULT_PROJECT_REF}.supabase.co`;

const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_SNz3ZbvVsnJxdcjWg17M4A_W9XAN6O7';

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
      
      return data || [];
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
      let builder = supabase.from(collectionName).select('*');
      
      // Apply exact matches for query properties dynamically
      for (const key in query) {
        builder = builder.eq(key, query[key]);
      }
      
      const { data, error } = await builder.order('id', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data || [];
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

      return data || null;
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
      const timestamp = new Date().toISOString();
      const { id, ...insertRow } = doc;
      
      if (insertRow.createdAt === undefined) insertRow.createdAt = timestamp;
      if (insertRow.updatedAt === undefined) insertRow.updatedAt = timestamp;

      if (collectionName === 'users' && insertRow.email) {
        insertRow.email = String(insertRow.email).toLowerCase().trim();
      }

      const { data, error } = await supabase
        .from(collectionName)
        .insert([insertRow])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
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
      const { id: _, ...updateRow } = updates;
      updateRow.updatedAt = new Date().toISOString();

      if (collectionName === 'users' && updateRow.email) {
        updateRow.email = String(updateRow.email).toLowerCase().trim();
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

      return data;
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
