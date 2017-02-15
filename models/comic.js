'use strict';
module.exports = function(sequelize, DataTypes) {
  var comic = sequelize.define('comic', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageSource: DataTypes.STRING,
    postDate: DataTypes.DATE,
    authorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comic.belongsTo(models.author);
      }
    }
  });
  return comic;
};