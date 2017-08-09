const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
const marked = require('marked');


// db.define takes in 3 parameters, name, definitions, options
const Page = db.define('page', {
    title: { type: Sequelize.STRING(333),
             allowNull: false },
    urlTitle: { type: Sequelize.STRING(333),
                allowNull: false },
    content: {  type: Sequelize.TEXT, 
                allowNull: false,
                get: marked(this.content) },
    status: { type: Sequelize.ENUM('open', 'closed') },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        set: function(value) {
            let arrayOfTags;
            if (typeof value === 'string') {
                arrayOfTags = value.split(',').map(function(x){
                    return x.trim();
                });
                this.setDataValue('tags', arrayOfTags);
            } else {
                this.setDataValue('tags', value);
            }
        }
    }
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
    },
    // classMethods: {

    //     findByTag: function(tag) {
    //         return Page.findAll({
    //             where: {
    //                 tags: {
    //                     $overlap: [tag]
    //                 }
    //             }
    //         });
    //     }

    // }
});


Page.findByTag = function(tag) {
  return this.findAll({
    where: {
      tags: {
        $contains: [tag]
      }
    }
  });
};

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

Page.prototype.findSimilar = function() {
    return Page.findAll({
        where: {
            tags: {
                $overlap: this.tags,
            },
            id: {
                $ne: this.id
            }
        }
    });
}


// this relationship gives us methods setAuthor() and getAuthor
Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User
}