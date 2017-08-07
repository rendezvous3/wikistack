const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
    title: { type: Sequelize.STRING(333),
             allowNull: false },
    urlTitle: { type: Sequelize.STRING(333),
                allowNull: false },
    content: {  type: Sequelize.TEXT, 
                allowNull: false },
    status: { type: Sequelize.ENUM('open', 'closed') }
})

const User = db.define('user', {
    name: { type: Sequelize.STRING(333),
            allowNull: false },
    email: { type: Sequelize.STRING(333),
             allowNull: false,
             unique: true,
             validate: {
                isEmail: true
             }}
});


module.exports = {
    Page: Page,
    User: User
}