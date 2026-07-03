require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const User = require("../src/models/user");

const skillSets = [
  ["React", "Node.js", "MongoDB"],
  ["Java", "Spring Boot", "MySQL"],
  ["Python", "Django", "PostgreSQL"],
  ["React Native", "Firebase"],
  ["Angular", "NestJS", "TypeScript"],
  ["Next.js", "Prisma", "Tailwind CSS"],
  ["Express.js", "Redis", "Docker"],
  ["AWS", "Docker", "Kubernetes"],
  ["Flutter", "Firebase", "Dart"],
  ["C++", "DSA", "Competitive Programming"],
  ["Go", "Microservices", "Redis"],
  ["Machine Learning", "Python", "TensorFlow"],
  ["MERN", "Socket.io", "JWT"],
  ["Vue.js", "Node.js", "MongoDB"],
  ["DevOps", "Linux", "Nginx"],
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);

    console.log("✅ Database Connected");

    const passwordHash = await bcrypt.hash("Password@123", 10);

    const users = [];

    for (let i = 1; i <= 100; i++) {
      const gender = Math.random() > 0.5 ? "male" : "female";

      let firstName;
      do {
        firstName = faker.person.firstName(gender);
      } while (firstName.length < 4);

      let lastName;
      do {
        lastName = faker.person.lastName();
      } while (lastName.length < 2);

      users.push({
        firstName,
        lastName,

        emailId: `developer${Date.now()}${i}@gmail.com`,

        password: passwordHash,

        age: faker.number.int({
          min: 21,
          max: 35,
        }),

        gender,

        about:
          faker.person.bio().length > 180
            ? faker.person.bio().substring(0, 180)
            : faker.person.bio(),

        photoUrl: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`,

        skills:
          skillSets[Math.floor(Math.random() * skillSets.length)],
      });
    }

    await User.insertMany(users);

    console.log("🎉 Successfully inserted 100 users.");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();