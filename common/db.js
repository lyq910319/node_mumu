var Sequelize = require('sequelize');

var sequelize = new Sequelize('test1', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
	 timestamps: false
  },
  timezone: '+08:00'

});


var comment = sequelize.define('comment', {
 	id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    date: Sequelize.DATE
});

module.exports = sequelize;