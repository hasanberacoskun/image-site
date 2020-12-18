-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_authorid` int NOT NULL,
  `fk_postid` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_toposttable_idx` (`fk_postid`),
  KEY `key_tousertable_idx` (`fk_authorid`),
  CONSTRAINT `key_toposttable` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_tousertable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'this is a test comment from curl',21,12,'2020-12-17 20:08:08'),(2,'here is another test comment',21,12,'2020-12-17 20:08:08'),(3,'Please let me post this.',21,13,'2020-12-17 21:54:04');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `poststousers_idx` (`fk_userid`),
  CONSTRAINT `poststousers` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'Some Images','This is just filled description. ','public/images/uploads/d55cca4b61a1db778c8dcf3d5f3f83687f59cfa07774.jpeg','public/images/uploads/thumbnail-d55cca4b61a1db778c8dcf3d5f3f83687f59cfa07774.jpeg',0,'2020-12-16 02:05:06',23),(3,'Another Title','Lorem ipsum or something along those lines.','public/images/uploads/a21c34058cee0573a4d9cb205280da7e21918d033260.jpeg','public/images/uploads/thumbnail-a21c34058cee0573a4d9cb205280da7e21918d033260.jpeg',0,'2020-12-16 02:05:33',23),(4,'Taking My Time','This is taking too much of my time. ','public/images/uploads/01aee0908e8496a4a9caa7fdc247aed35b4370f1899c.jpeg','public/images/uploads/thumbnail-01aee0908e8496a4a9caa7fdc247aed35b4370f1899c.jpeg',0,'2020-12-16 02:05:50',23),(5,'Some Picture Great','I feel like I shouldn\'t be doing this manually. ','public/images/uploads/6157741bb4e9139360a530360dccd34ec75802ba3149.jpeg','public/images/uploads/thumbnail-6157741bb4e9139360a530360dccd34ec75802ba3149.jpeg',0,'2020-12-16 02:06:21',23),(6,'Raccoon','Here are some animals existing.','public/images/uploads/2d9e15b94700aa282ac22fc05dfb6d773fd6099cfa13.jpeg','public/images/uploads/thumbnail-2d9e15b94700aa282ac22fc05dfb6d773fd6099cfa13.jpeg',0,'2020-12-16 02:06:46',23),(7,'Spider','Here is a spider. Have some more text.','public/images/uploads/552d3cb6ac9c0329209935b0c1a94fa760e6b359e9f7.jpeg','public/images/uploads/thumbnail-552d3cb6ac9c0329209935b0c1a94fa760e6b359e9f7.jpeg',0,'2020-12-16 02:07:49',24),(8,'Boats','I have provided you with this image of some boats.','public/images/uploads/26b6691a1db2379a9bb59532c2191fdc9ad431a5fff2.jpeg','public/images/uploads/thumbnail-26b6691a1db2379a9bb59532c2191fdc9ad431a5fff2.jpeg',0,'2020-12-16 02:08:20',24),(9,'Flowers','Just some yellow flowers here. ','public/images/uploads/bfca7ae5fa8666a9c074342851fc66100b1b6cf1d1e1.jpeg','public/images/uploads/thumbnail-bfca7ae5fa8666a9c074342851fc66100b1b6cf1d1e1.jpeg',0,'2020-12-16 02:08:39',24),(10,'Something','I don\'t know what this is.','public/images/uploads/b082105b6f81381c2925439e450779e6a86af324beae.jpeg','public/images/uploads/thumbnail-b082105b6f81381c2925439e450779e6a86af324beae.jpeg',0,'2020-12-16 02:08:53',24),(11,'Bug','This is a bug. Look at it.','public/images/uploads/1a1c0b1e3fcad4612e8b766e5699a229bdac7fb3be2b.jpeg','public/images/uploads/thumbnail-1a1c0b1e3fcad4612e8b766e5699a229bdac7fb3be2b.jpeg',0,'2020-12-16 02:09:17',24),(12,'Landscape','This is a landscape. It has a tree. ','public/images/uploads/8f12803b0fa0d89d1394ca94033674e3e8e2fccb272c.jpeg','public/images/uploads/thumbnail-8f12803b0fa0d89d1394ca94033674e3e8e2fccb272c.jpeg',0,'2020-12-16 02:09:40',24),(13,'An Image','This is some description. Stuff.','public/images/uploads/a6f3593f7d23804470521e426129dc970eca72f4323f.jpeg','public/images/uploads/thumbnail-a6f3593f7d23804470521e426129dc970eca72f4323f.jpeg',0,'2020-12-16 03:32:30',21);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'memer','memer@mail.com','$2b$15$/GOZH4gzAGLClDoCgyNQWuj.H8NXAyh64XNFGbu3k6tBUIdSOFqvW',0,0,'2020-12-15 17:22:33'),(22,'memer2','memer2@mail.com','$2b$15$uYqOiB0esPN.WUFNXDEKLuAOElW5NiNemlbOmT/lF0dzgRV0VVOFW',0,0,'2020-12-15 17:23:00'),(23,'Jonathan','jonathanjoestar@mail.com','$2b$15$Rv.2wYfTJF8xthTdiFPP9u8/Z9glUQkg6pkLf7PuTavkPwLeWjycS',0,0,'2020-12-16 02:04:23'),(24,'Salad','salad@mail.com','$2b$15$SMoo2zCsI/6nBrXLfZsLJOytlr3GBFyLBjNKL5ai8dt9BE/MGQeEm',0,0,'2020-12-16 02:07:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17 23:38:47
