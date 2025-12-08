CREATE DATABASE  IF NOT EXISTS `resbellavista` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `resbellavista`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: resbellavista
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `financeiro`
--

DROP TABLE IF EXISTS `financeiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financeiro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_compra` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `boleto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financeiro`
--

LOCK TABLES `financeiro` WRITE;
/*!40000 ALTER TABLE `financeiro` DISABLE KEYS */;
INSERT INTO `financeiro` VALUES (1,1,'2025-12-05','pago','1234'),(2,1,'2026-01-05','pago','1234'),(3,1,'2026-02-05','cancelado','1234'),(4,1,'2026-03-05','cancelado','1234'),(5,1,'2026-04-05','cancelado',''),(6,1,'2026-05-05','pago','boletos/1_2026-05-05_Modelo-de-Boleto.pdf'),(7,1,'2026-06-05','pendente','boletos/1_2026-06-05_Modelo-de-Boleto.pdf'),(8,2,'2025-12-05','pago','boletos/2_2025-12-05_Modelo-de-Boleto.pdf'),(9,1,'2025-07-05','pendente','boletos/1_2025-07-05_Modelo-de-Boleto.pdf');
/*!40000 ALTER TABLE `financeiro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-08 14:11:16
