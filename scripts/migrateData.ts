/**
 * Data Migration Script
 *
 * This script uploads all initial data from the TypeScript data files
 * to Firebase Firestore. Run this once after setting up Firebase.
 *
 * Usage: npm run migrate-data
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { projects } from '../src/data/projects';
import { teamMembers } from '../src/data/team';
import { newsItems } from '../src/data/news';
import { collaborators } from '../src/data/collaborators';
import { fundingSources } from '../src/data/funding';
import { publications } from '../src/data/publications';
import { software } from '../src/data/software';
import { jobOpenings } from '../src/data/jobOpenings';

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateData() {
  console.log('🚀 Starting data migration to Firestore...\n');

  try {
    // Migrate Projects
    console.log(`📁 Migrating ${projects.length} projects...`);
    for (const project of projects) {
      await setDoc(doc(db, 'projects', project.id), project);
      console.log(`  ✓ ${project.title}`);
    }

    // Migrate Team Members
    console.log(`\n👥 Migrating ${teamMembers.length} team members...`);
    for (const member of teamMembers) {
      await setDoc(doc(db, 'teamMembers', member.id), member);
      console.log(`  ✓ ${member.name}`);
    }

    // Migrate News Items
    console.log(`\n📰 Migrating ${newsItems.length} news items...`);
    for (const news of newsItems) {
      await setDoc(doc(db, 'newsItems', news.id), news);
      console.log(`  ✓ ${news.title}`);
    }

    // Migrate Publications
    console.log(`\n📚 Migrating ${publications.length} publications...`);
    for (const pub of publications) {
      await setDoc(doc(db, 'publications', pub.id), pub);
      console.log(`  ✓ ${pub.title.substring(0, 50)}...`);
    }

    // Migrate Software
    console.log(`\n💻 Migrating ${software.length} software packages...`);
    for (const sw of software) {
      await setDoc(doc(db, 'software', sw.id), sw);
      console.log(`  ✓ ${sw.name}`);
    }

    // Migrate Job Openings
    console.log(`\n💼 Migrating ${jobOpenings.length} job openings...`);
    for (const job of jobOpenings) {
      await setDoc(doc(db, 'jobOpenings', job.id), job);
      console.log(`  ✓ ${job.title}`);
    }

    // Migrate Collaborators
    console.log(`\n🤝 Migrating ${collaborators.length} collaborators...`);
    for (const collab of collaborators) {
      await setDoc(doc(db, 'collaborators', collab.id), collab);
      console.log(`  ✓ ${collab.name}`);
    }

    // Migrate Funding Sources
    console.log(`\n💰 Migrating ${fundingSources.length} funding sources...`);
    for (const fund of fundingSources) {
      await setDoc(doc(db, 'fundingSources', fund.id), fund);
      console.log(`  ✓ ${fund.name}`);
    }

    // Set default featured items
    console.log(`\n⭐ Setting default featured items...`);
    const featuredItems = {
      projectId: projects.length > 0 ? projects[0].id : null,
      newsItemId: newsItems.length > 0 ? newsItems[0].id : null,
      publicationId: publications.length > 0 ? publications[0].id : null,
    };
    await setDoc(doc(db, 'settings', 'featuredItems'), featuredItems);
    console.log('  ✓ Featured items set');

    // Set default team image
    console.log(`\n🖼️  Setting default team image...`);
    const teamImage = {
      imageUrl: 'https://i.postimg.cc/j2yg6GfL/lab-team.jpg',
      position: 'center',
    };
    await setDoc(doc(db, 'settings', 'teamImage'), teamImage);
    console.log('  ✓ Team image set');

    // Initialize empty topic color registry
    console.log(`\n🎨 Initializing topic color registry...`);
    await setDoc(doc(db, 'settings', 'topicColors'), { registry: {} });
    console.log('  ✓ Topic color registry initialized');

    console.log('\n✅ Migration completed successfully!');
    console.log('\nSummary:');
    console.log(`  - ${projects.length} projects`);
    console.log(`  - ${teamMembers.length} team members`);
    console.log(`  - ${newsItems.length} news items`);
    console.log(`  - ${publications.length} publications`);
    console.log(`  - ${software.length} software packages`);
    console.log(`  - ${jobOpenings.length} job openings`);
    console.log(`  - ${collaborators.length} collaborators`);
    console.log(`  - ${fundingSources.length} funding sources`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();
