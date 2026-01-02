-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (x86_64)
--
-- Host: 127.0.0.1    Database: top_afiliado
-- ------------------------------------------------------
-- Server version	8.4.6

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `texto` text COLLATE utf8mb3_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Pet',NULL),(2,'Moda feminina',NULL),(3,'Moda masculina',NULL),(4,'Automotivo',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `video` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `capa` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `link` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `texto` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (5,'Grade de Proteção para Animais','video/WhatsApp Video 2025-12-30 at 12.47.41.mp4','capa/WhatsApp Image 2025-12-30 at 12.46.09.jpeg','https://shopee.com.br/Grade-Port%C3%A3o-Prote%C3%A7%C3%A3o-Animais-Beb%C3%AA-78-a-132cm-Porta-Pet-Corredor-Top-Promo%C3%A7%C3%A3o-i.1206406519.21399881935?extraParams=%7B%22display_model_id%22%3A169408974703%2C%22model_selection_logic%22%3A3%7D&sp_atk=1b305d8c-a727-4c5d-b528-2272362e6a2e&xptdk=1b305d8c-a727-4c5d-b528-2272362e6a2e','Mantenha seu pet seguro e controle o acesso aos cômodos com praticidade! Ideal para quem busca segurança e organização no dia a dia.','2025-12-30'),(7,'Camiseta Polo','video/WhatsApp Video 2025-12-30 at 12.47.41.mp4','capa/WhatsApp Image 2025-12-30 at 12.46.09.jpeg','https://shopee.com.br/Grade-Port%C3%A3o-Prote%C3%A7%C3%A3o-Animais-Beb%C3%AA-78-a-132cm-Porta-Pet-Corredor-Top-Promo%C3%A7%C3%A3o-i.1206406519.21399881935?extraParams=%7B%22display_model_id%22%3A169408974703%2C%22model_selection_logic%22%3A3%7D&sp_atk=1b305d8c-a727-4c5d-b528-2272362e6a2e&xptdk=1b305d8c-a727-4c5d-b528-2272362e6a2e','Mantenha seu pet seguro e controle o acesso aos cômodos com praticidade! Ideal para quem busca segurança e organização no dia a dia.','2025-12-30');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos_categorias`
--

DROP TABLE IF EXISTS `produtos_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos_categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_produto` int DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos_categorias`
--

LOCK TABLES `produtos_categorias` WRITE;
/*!40000 ALTER TABLE `produtos_categorias` DISABLE KEYS */;
INSERT INTO `produtos_categorias` VALUES (1,5,1),(2,7,3);
/*!40000 ALTER TABLE `produtos_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `otp` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `mail` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Daniel Pintscher Baptista',5511962601113,'2025-12-30','a','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NjczNTUyMDksImV4cCI6MTc2NzM5ODQwOSwic3ViIjoiZGFuaWVsLnBpbnRzY2hlckBnbWFpbC5jb20ifQ.wx1DsGVn8yo89PCWRplHNf8auZaCsfgMVoDSoum18ZA','412837','daniel.pintscher@gmail.com','7c0356f17b89a8b80b7d828ee9233763');
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

-- Dump completed on 2026-01-02 10:04:19
