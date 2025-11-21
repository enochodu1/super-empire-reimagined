/**
 * Database Migration Script for Supabase
 *
 * This script migrates product data from local files to Supabase database.
 * Run with: npx tsx scripts/migrate-to-supabase.ts
 *
 * Prerequisites:
 * 1. Set up Supabase project
 * 2. Create database tables (see PHASE-1-ENHANCEMENTS.md)
 * 3. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { products } from '../src/data/products';
import { tortillaProducts } from '../src/data/tortillaProducts';
import { getProductImageUrl } from '../src/lib/productImages';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface ProductData {
  name: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  pack_size: string;
  image_url: string | null;
  stock_quantity: number;
  stock_status: 'in-stock' | 'low-stock' | 'out-of-stock';
  description: string | null;
}

async function migrateProducts() {
  console.log('🚀 Starting product migration to Supabase...\n');

  // Combine all products
  const allProducts = [...products, ...tortillaProducts];
  console.log(`📦 Found ${allProducts.length} products to migrate\n`);

  // Transform products to match database schema
  const productsToInsert: ProductData[] = allProducts.map(product => ({
    name: product.name,
    category: product.category,
    subcategory: product.subcategory || 'General',
    price: product.price,
    unit: product.unit,
    pack_size: product.packSize || '',
    image_url: product.image || getProductImageUrl(product.subcategory, product.category),
    stock_quantity: 100, // Default stock
    stock_status: 'in-stock' as const,
    description: `Fresh ${product.name} - ${product.packSize}`,
  }));

  // Check if products already exist
  const { count: existingCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if (existingCount && existingCount > 0) {
    console.log(`⚠️  Warning: ${existingCount} products already exist in database`);
    console.log('Do you want to:');
    console.log('1. Skip migration (products already exist)');
    console.log('2. Clear and re-import all products');
    console.log('\nTo proceed, delete existing products manually and run script again.\n');
    return;
  }

  // Insert products in batches
  const batchSize = 50;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < productsToInsert.length; i += batchSize) {
    const batch = productsToInsert.slice(i, i + batchSize);

    console.log(`📤 Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(productsToInsert.length / batchSize)}...`);

    const { data, error } = await supabase
      .from('products')
      .insert(batch)
      .select();

    if (error) {
      console.error(`❌ Error inserting batch: ${error.message}`);
      errorCount += batch.length;
    } else {
      successCount += batch.length;
      console.log(`✅ Successfully inserted ${batch.length} products`);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successful: ${successCount} products`);
  console.log(`❌ Failed: ${errorCount} products`);
  console.log(`📦 Total: ${allProducts.length} products\n`);

  if (successCount > 0) {
    console.log('🎉 Migration completed successfully!');
    console.log('You can now view products at your Supabase dashboard:\n');
    console.log(`${supabaseUrl}/project/_/editor`);
  }
}

async function verifyConnection() {
  console.log('🔍 Verifying Supabase connection...');

  const { data, error } = await supabase
    .from('products')
    .select('count')
    .limit(1);

  if (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nPlease ensure:');
    console.error('1. Database tables are created (see PHASE-1-ENHANCEMENTS.md)');
    console.error('2. Row Level Security policies allow inserts');
    console.error('3. VITE_SUPABASE_ANON_KEY has correct permissions\n');
    return false;
  }

  console.log('✅ Connection successful!\n');
  return true;
}

// Main execution
async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  Super Empire Produce - Database Migration');
  console.log('═══════════════════════════════════════════\n');

  const isConnected = await verifyConnection();

  if (!isConnected) {
    process.exit(1);
  }

  await migrateProducts();
}

main().catch(error => {
  console.error('💥 Migration failed with error:', error);
  process.exit(1);
});
