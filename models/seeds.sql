CREATE TABLE users (
  id INT NOT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  firstName VARCHAR(45)  NOT NULL,
  lastName VARCHAR(45)  NOT NULL,
  phoneNumber VARCHAR(50) NOT NULL,
  role VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

-- INSERT INTO Users (email, password,firstName, lastName, phoneNumber, role)
-- VALUES ("andrewmuscara@gmail.com", "chillin", "andrew", "muscara", 4805555555, "coach");

-- INSERT INTO Users (email, password,firstName, lastName, phoneNumber, role)
-- VALUES ("shelly@gmail.com", "mtdew", "shelly", "lane", 4802745555, "parent");

-- INSERT INTO Users (email, password,firstName, lastName, phoneNumber, role)
-- VALUES ("darlene@aol.net", "forums", "darlene", "leslie", 6025555555, "parent");
