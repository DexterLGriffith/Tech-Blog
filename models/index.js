const User = require('./Users');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User,{
    foreignKey: "userId",
    onDelete: "CASCADE"
})
Post.hasMany(Comment,{
    foreignKey: "userId",
    onDelete: "CASCADE"
})
Comment.belongsTo(User,{
    foreignKey: "userId",
    onDelete: "CASCADE"
})

module.exports = index;