module.exports = function (sequelize, DataTypes) {
  var event = sequelize.define("event", {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    location: DataTypes.STRING,
  });
  return event;
};

