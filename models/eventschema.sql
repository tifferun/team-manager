CREATE TABLE events (
  id INT NOT NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8_bin NOT NULL,
  start datetime NOT NULL,
  end datetime DEFAULT NULL,
  location varchar(75) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO events (title, start, location)
VALUES ("Practice", "2018-11-28T12:00:00", "Pecos Park" );

INSERT INTO events (title, start, location)
VALUES ("Game", "2018-11-30T15:00:00", "Pecos Park" );

