const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://rovertrupesh:Rupesh123@cluster0.itlso.mongodb.net/makhana';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdminUser() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@makhana.com' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email: admin@makhana.com');
            console.log('You can reset the password by deleting this user from MongoDB Compass and running this script again.');
            process.exit(0);
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@makhana.com',
            password: hashedPassword,
            role: 'admin',
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('\n📧 Login Credentials:');
        console.log('   Email: admin@makhana.com');
        console.log('   Password: admin123');
        console.log('\n⚠️  IMPORTANT: Change this password after first login!');
        console.log('\nYou can now login at: http://localhost:3000/login\n');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
}

createAdminUser();
