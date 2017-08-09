const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


// db.define takes in 3 parameters, name, definitions, options
const Page = db.define('page', {
    title: { type: Sequelize.STRING(333),
             allowNull: false },
    urlTitle: { type: Sequelize.STRING(333),
                allowNull: false },
    content: {  type: Sequelize.TEXT, 
                allowNull: false },
    status: { type: Sequelize.ENUM('open', 'closed') }
}, {
    hooks: {
        beforeValidate: function(page) {
            if(page.title){
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            }
            console.log(page);
        },
    },
    getterMethods: {
        // Note that this getter method is invoked without () {{ page.route }}
        // Because of Object.defineProperty etc...
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    }
});

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


// this relationship gives us methods setAuthor() and getAuthor
Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User
}