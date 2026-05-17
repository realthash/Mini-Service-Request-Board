const mongoose = require('mongoose');
require('dotenv').config();

const JobRequest = require('./src/models/JobReq');

const sampleJobs = [
  {
    title: 'Need a plumber for a leaking kitchen tap',
    description: 'Kitchen tap has been dripping non-stop for three days. Looking for someone to fix it as soon as possible.',
    category: 'Plumbing',
    location: 'Borella',
    contactName: 'James MacDonald',
    contactEmail: 'james.m@example.com',
    status: 'Open',
  },
  {
    title: 'Bathroom light fixture not working',
    description: 'The main ceiling light in the bathroom stopped working last week. Need a certified electrician.',
    category: 'Electrical',
    location: 'Rajagirya',
    contactName: 'Zara Campbell',
    contactEmail: 'sarah.c@example.com',
    status: 'Open',
  },
  {
    title: 'Painting the entire living room',
    description: 'Need someone with the right equipment and experience to do a clean job.',
    category: 'Painting',
    location: 'Kelaniya',
    contactName: 'David Reid',
    contactEmail: 'david.r@example.com',
    status: 'In Progress',
  },
  {
    title: 'Replace broken kitchen cabinet doors',
    description: 'Two of the upper kitchen cabinet doors are off their hinges and one has cracked. Need someone with joinery skills to either repair or replace them.',
    category: 'Joinery',
    location: 'Kandy',
    contactName: 'Emily Watson',
    contactEmail: 'emily.w@example.com',
    status: 'Open',
  },
  {
    title: 'Install new outdoor security lighting',
    description: 'Need to install three motion-sensor security lights around the back garden. Wiring and mounting required. Power source available nearby.',
    category: 'Electrical',
    location: 'Kandy',
    contactName: 'Michael OConnor',
    contactEmail: 'michael.o@example.com',
    status: 'Open',
  },
  {
    title: 'Blocked toilet - urgent',
    description: 'Master bedroom ensuite toilet is completely blocked. Tried plunger with no success. Likely needs professional drain unblocking equipment.',
    category: 'Plumbing',
    location: 'Colombo',
    contactName: 'Rachel Smith',
    contactEmail: 'rachel.s@example.com',
    status: 'Closed',
  },
  {
    title: 'Repaint front door and window frames',
    description: 'Exterior paint on the front door and ground floor window frames is peeling. Wood is exposed in places. Need scraping, sanding, priming and two coats.',
    category: 'Painting',
    location: 'Kurunegala',
    contactName: 'Thomas Walker',
    contactEmail: 'thomas.w@example.com',
    status: 'Open',
  },
  {
    title: 'Build a custom bookshelf',
    description: 'Looking for a carpenter to build a bookshelf in the home office. Approximately 2.4m tall by 1.8m wide. White oak preferred.',
    category: 'Joinery',
    location: 'Matara',
    contactName: 'Emily Brown',
    contactEmail: 'emily.b@example.com',
    status: 'In Progress',
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing jobs
    const deletedCount = await JobRequest.deleteMany({});
    console.log(`Cleared ${deletedCount.deletedCount} existing jobs`);

    // Insert sample jobs
    const created = await JobRequest.insertMany(sampleJobs);
    console.log(`Inserted ${created.length} sample jobs`);

    console.log('\nSeed complete!');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    // Always disconnect when done
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedDatabase();