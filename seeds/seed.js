const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const userData = require('./userData.json');
const projectData = require('./blogEntries.json');

const seedDb = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, { 
        individualHooks: true,
        returning: true,
    });

    for  (const project of projectData) { 
        await project.create({
            ...project, 
            user_id: users[Math.floor(Math.random() * userss.length)].id,
        });
    }

    process.exit(0);
}

seedDb();