# CSC 317 Term Project

## Purpose

The purpose is to learn some full stack web development.

## Student Information

|               | Information           |
|:-------------:|:---------------------:|
| Student Name  | Bera Hasan Coskun     |
| Student Email | hcoskun@mail.sfsu.edu |



# Build/Run Instructions

## Build Instructions
1. Use npm to install dependencies.

2. Install MySQL for the database.

   - Modify ` application/config/database.js` to match your database.

   - Parameters to modify:

     - `host`
     - `user`
     - `password`
     - `database`
     - `port`

   - Use the `application\config\useme.sql` file to import the database into MySQL. Ensure database is selected by double clicking on it in the schemas tab.

   - (alternative, tables will be empty and you will have to populate them) Run the following to create the database:
   
  ```mysql
     CREATE DATABASE IF NOT EXISTS `csc317db`;
  
     USE `csc317db`;
     
     CREATE TABLE IF NOT EXISTS `csc317db`.`users` (
       `id` INT NOT NULL AUTO_INCREMENT,
       `username` VARCHAR(64) NOT NULL,
       `email` VARCHAR(128) NOT NULL,
       `password` VARCHAR(128) NOT NULL,
       `usertype` INT NOT NULL DEFAULT 0,
       `active` INT NOT NULL DEFAULT 0,
       `created` DATETIME NOT NULL,
       PRIMARY KEY (`id`),
       UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
       UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
     ENGINE = InnoDB;
     
     CREATE TABLE IF NOT EXISTS `csc317db`.`posts` (
       `id` INT NOT NULL AUTO_INCREMENT,
       `title` VARCHAR(128) NOT NULL,
       `description` VARCHAR(4096) NOT NULL,
       `photopath` VARCHAR(4096) NOT NULL,
       `thumbnail` VARCHAR(4096) NOT NULL,
       `active` INT NOT NULL DEFAULT 0,
       `created` DATETIME NOT NULL,
       `fk_userid` INT NOT NULL,
       PRIMARY KEY (`id`),
       UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
       INDEX `poststousers_idx` (`fk_userid` ASC) VISIBLE,
       CONSTRAINT `poststousers`
         FOREIGN KEY (`fk_userid`)
         REFERENCES `csc317db`.`users` (`id`)
         ON DELETE CASCADE
         ON UPDATE CASCADE)
     ENGINE = InnoDB;
     
     CREATE TABLE `csc317db`.`comments` (
       `id` INT NOT NULL AUTO_INCREMENT,
       `comment` MEDIUMTEXT NOT NULL,
       `fk_authorid` INT NOT NULL,
       `fk_postid` INT NOT NULL,
       `created` DATETIME NOT NULL DEFAULT now(),
       PRIMARY KEY (`id`),
       UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
       INDEX `key_toposttable_idx` (`fk_postid` ASC) VISIBLE,
       INDEX `key_tousertable_idx` (`fk_authorid` ASC) VISIBLE,
       CONSTRAINT `key_tousertable`
         FOREIGN KEY (`fk_authorid`)
         REFERENCES `csc317db`.`users` (`id`)
         ON DELETE NO ACTION
         ON UPDATE NO ACTION,
       CONSTRAINT `key_toposttable`
         FOREIGN KEY (`fk_postid`)
         REFERENCES `csc317db`.`posts` (`id`)
         ON DELETE NO ACTION
         ON UPDATE NO ACTION);
      ENGINE = InnoDB;alter
     ```
   

## Run Instructions

1. Start database.
2. Start app using `npm run` in the `application` directory.
3. Visit `localhost:3000` to view page.
