CREATE DATABASE  IF NOT EXISTS `OSP` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `OSP`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: OSP
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `input_spec_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_choices_input_spec_idx` (`input_spec_id`),
  CONSTRAINT `fk_choices_input_spec` FOREIGN KEY (`input_spec_id`) REFERENCES `input_specs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
INSERT INTO `choices` VALUES (1,'Strongly Agree',1),(2,'Agree',1),(3,'Neutral',1),(4,'Disagree',1),(5,'Strongly Disagree',1),(6,'Always',2),(7,'Often',2),(8,'Sometimes',2),(9,'Seldom',2),(10,'Never',2),(11,'Extremely',3),(12,'Very',3),(13,'Moderately',3),(14,'Slightly',3),(15,'Not at all',3),(16,'Excellent',4),(17,'Above Average',4),(18,'Average',4),(19,'Below Average',4),(20,'Very Poor',4),(144,'A',NULL),(145,'B',NULL),(146,'3',NULL),(147,'C',NULL),(148,'D',NULL),(149,'E',NULL),(150,'Up to 5 minutes',NULL),(151,'Around 10 minutes',NULL),(152,'15 minutes or more',NULL),(153,'Yes',NULL),(154,'No',NULL),(155,'Yes',NULL),(156,'No',NULL),(157,'Part-time',NULL),(158,'Temporary',NULL),(159,'Full-time',NULL),(160,'Not employed',NULL),(161,'<10000',NULL),(162,'10000-15000',NULL),(163,'15001-20000',NULL),(164,'20001-25000',NULL),(165,'25001-30000',NULL),(166,'>30000',NULL);
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `input_specs`
--

DROP TABLE IF EXISTS `input_specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `input_specs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `input_specs`
--

LOCK TABLES `input_specs` WRITE;
/*!40000 ALTER TABLE `input_specs` DISABLE KEYS */;
INSERT INTO `input_specs` VALUES (1,'Strongly Agree - Strongly Disagree'),(2,'Always - Never'),(3,'Extremely - Not at all'),(4,'Excellent - Very Poor');
/*!40000 ALTER TABLE `input_specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_choices`
--

DROP TABLE IF EXISTS `question_choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_choices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `choice_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_question_choices_question_idx` (`question_id`),
  KEY `fk_question_choices_choice_idx` (`choice_id`),
  CONSTRAINT `fk_question_choices_choice` FOREIGN KEY (`choice_id`) REFERENCES `choices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_question_choices_question` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_choices`
--

LOCK TABLES `question_choices` WRITE;
/*!40000 ALTER TABLE `question_choices` DISABLE KEYS */;
INSERT INTO `question_choices` VALUES (76,77,144),(77,77,145),(79,77,147),(80,77,148),(81,77,149),(82,80,150),(83,80,151),(84,80,152),(85,6,153),(86,6,154),(87,7,155),(88,7,156),(89,83,157),(90,83,158),(91,83,159),(92,83,160),(93,84,161),(94,84,162),(95,84,163),(96,84,164),(97,84,165),(98,84,166),(99,1,1),(100,1,2),(101,1,3),(102,1,4),(103,1,5),(104,5,16),(105,5,17),(106,5,18),(107,5,19),(108,5,20),(109,69,1),(110,69,2),(111,69,3),(112,69,4),(113,69,5),(114,82,6),(115,82,7),(116,82,8),(117,82,9),(118,82,10);
/*!40000 ALTER TABLE `question_choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `survey_id` int NOT NULL,
  `input_spec_id` int DEFAULT NULL,
  `input_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questions_survey_idx` (`survey_id`),
  KEY `fk_questions_input_spec_idx` (`input_spec_id`),
  CONSTRAINT `fk_questions_input_spec` FOREIGN KEY (`input_spec_id`) REFERENCES `input_specs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_questions_survey` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'The instructor was well prepared for class.',1,1,'ls'),(5,'How would you rate the cafeteria food?',2,4,'ls'),(6,'Do you think the food you buy is good value for money?',2,NULL,'mc'),(7,'Do you feel that this university is preparing you adequately for the job market?',3,NULL,'mc'),(69,'The instructor demonstrated knowledge of course materials.',1,1,'ls'),(77,'What is your expected grade in this course?',1,NULL,'mc'),(78,'Do you have any specific recommendations for improving this course?',1,NULL,'textbox'),(79,'What are your favourite foods on the current menu?',2,NULL,'textbox'),(80,'How long do you have to wait in line for food?',2,NULL,'mc'),(81,'What was your favorite course?',3,NULL,'textbox'),(82,'How often do you skip class?',3,2,'ls'),(83,'Describe your present job.',29,NULL,'mc'),(84,'What is your monthly income?',29,NULL,'mc');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `response_texts`
--

DROP TABLE IF EXISTS `response_texts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `response_texts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_response_texts_question_id_idx` (`question_id`),
  CONSTRAINT `fk_response_texts_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `response_texts`
--

LOCK TABLES `response_texts` WRITE;
/*!40000 ALTER TABLE `response_texts` DISABLE KEYS */;
/*!40000 ALTER TABLE `response_texts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_choice_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_responses_question_choice_idx` (`question_choice_id`),
  CONSTRAINT `fk_responses_question_choice` FOREIGN KEY (`question_choice_id`) REFERENCES `question_choices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `token` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` VALUES (1,'COMP2111 - Course Evaluation ','d9ttyv8r'),(2,'Student Cafeteria Survey','pctacjlq'),(3,'Student Satisfaction Survey','krofcoo8'),(29,'Graduate Survey','mdnp1hfw');
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-29 14:17:24
