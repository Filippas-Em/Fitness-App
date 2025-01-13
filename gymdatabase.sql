-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2025 at 06:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gymdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `info` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `info`, `date`, `time`) VALUES
(1, 'Holiday closure on New Year\'s Day.', '2024-01-01', '09:00:00'),
(2, 'New Yoga class starting next week!', '2024-01-08', '15:30:00'),
(3, 'H maria einai periergh', '2024-02-15', '10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `info` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`id`, `info`, `date`, `time`) VALUES
(1, '20% off on all memberships this month!', '2024-01-01', '09:00:00'),
(2, 'Buy one, get one free on personal training sessions.', '2024-01-10', '12:00:00'),
(3, 'Free trial week for new members.', '2024-01-15', '10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE `queue` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`id`, `name`, `surname`, `country`, `address`, `city`, `email`, `username`, `password`, `created_at`) VALUES
(12, 'biggus', 'chungus', 'greko', 'asdasd', 'ier', 'big@mail.com', 'biggus', '$2y$10$e1sfCDFGhocBMkiIBVCvCOjfy8K47my49k0oX7uJP72x4O4G.ItJO', '2024-12-26 11:44:32'),
(13, 'Barbas', 'Brilios', 'Greece', 'Piraeus', 'Athens', 'barbas@brilios.com', 'Barbas', '$2y$10$xZ8fuVS3VDZQfryhXs8VsOg2WC5FUQLj5G717R2qfCV2Y2xxRIBBq', '2024-12-31 14:59:11');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `solo_service_name` varchar(255) DEFAULT NULL,
  `team_service_name` varchar(255) DEFAULT NULL,
  `max_occupancy` int(11) NOT NULL,
  `reservation_date` date NOT NULL,
  `time_slot` varchar(255) DEFAULT NULL,
  `canceled` tinyint(1) NOT NULL DEFAULT 0
) ;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `user_id`, `solo_service_name`, `team_service_name`, `max_occupancy`, `reservation_date`, `time_slot`, `canceled`) VALUES
(11, 0, '1', NULL, 1, '0000-00-00', '06:00 PM - 08:00 PM', 0),
(12, 0, '1', NULL, 1, '2025-01-12', '07:00 - 08:00', 0),
(13, 0, '1', NULL, 1, '2025-01-12', '07:00 - 08:00', 0),
(14, 0, '2', NULL, 1, '2025-01-12', '08:00 - 09:00', 0),
(16, 1, 'weights', NULL, 1, '2025-01-12', '07:00 - 08:00', 0),
(17, 2, 'weights', NULL, 1, '2025-01-12', '08:00 - 09:00', 0),
(18, 2, 'pilates', NULL, 1, '2025-01-14', '12:00 - 13:00', 0),
(21, 1, NULL, 'yoga', 1, '2025-01-12', '07:00 - 08:00', 0),
(22, 1, NULL, 'kick boxing', 1, '2025-01-12', '07:00 - 08:00', 0),
(23, 1, NULL, 'trx', 1, '2025-01-12', '07:00 - 08:00', 0),
(25, 1, 'cardio', NULL, 1, '2025-01-12', '07:00 - 08:00', 0),
(26, 2, 'pilates', NULL, 1, '2025-01-12', '10:00 - 11:00', 0),
(27, 2, NULL, 'yoga', 1, '2025-01-12', '10:00 AM - 02:00 PM', 0),
(28, 10, 'cardio', NULL, 1, '2025-01-12', '08:00 - 09:00', 1),
(29, 10, NULL, 'trx', 1, '2025-01-14', '07:00 AM - 08:30 AM', 1),
(30, 10, 'weights', NULL, 1, '2025-01-24', '13:00 - 14:00', 1),
(31, 10, 'cardio', NULL, 1, '2025-01-12', '07:00 - 08:00', 1),
(32, 10, NULL, 'yoga', 1, '2025-01-19', '10:00 AM - 02:00 PM', 1),
(33, 10, 'weights', NULL, 1, '2025-01-12', '07:00 - 08:00', 1),
(34, 10, 'weights', NULL, 1, '2025-01-31', '07:00 - 08:00', 1),
(35, 10, 'weights', NULL, 1, '2025-01-01', '07:00 - 08:00', 1),
(36, 10, 'weights', NULL, 1, '2025-01-12', '07:00 - 08:00', 1),
(37, 10, 'pilates', NULL, 1, '2025-01-12', '10:00 - 11:00', 1),
(38, 10, 'cardio', NULL, 1, '2025-01-12', '08:00 - 09:00', 1),
(39, 10, NULL, 'yoga', 1, '2025-01-12', '10:00 AM - 02:00 PM', 1),
(40, 10, 'weights', NULL, 1, '2025-01-20', '19:00 - 20:00', 1),
(41, 10, NULL, 'trx', 1, '2025-01-21', '07:00 AM - 08:30 AM', 0),
(42, 10, NULL, 'kick boxing', 1, '2025-01-30', '06:00 PM - 08:00 PM', 1),
(43, 10, 'cardio', NULL, 1, '2025-01-21', '10:00 - 11:00', 0),
(44, 10, 'weights', NULL, 1, '2025-01-19', '07:00 - 08:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `solo_services`
--

CREATE TABLE `solo_services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solo_services`
--

INSERT INTO `solo_services` (`id`, `service_name`) VALUES
(1, 'pilates'),
(2, 'weights'),
(3, 'cardio');

-- --------------------------------------------------------

--
-- Table structure for table `team_services`
--

CREATE TABLE `team_services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `days_of_week` varchar(255) NOT NULL,
  `times` varchar(255) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `max_occupancy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_services`
--

INSERT INTO `team_services` (`id`, `service_name`, `days_of_week`, `times`, `trainer_id`, `max_occupancy`) VALUES
(8, 'yoga', 'Saturday, Sunday', '10:00 AM - 02:00 PM', 1, 25),
(9, 'kick boxing', 'Thursday', '06:00 PM - 08:00 PM', 2, 10),
(10, 'trx', 'Tuesday, Thursday', '07:00 AM - 08:30 AM', 2, 20);

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`id`, `name`, `surname`, `specialty`) VALUES
(1, 'John', 'Doe', 'Yoga'),
(2, 'Jane', 'Smith', 'Strength Training'),
(3, 'Pepe', 'Gaga', 'trainer'),
(4, 'Maria', 'Filippa', 'gay');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `cancellation_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `country`, `address`, `city`, `email`, `username`, `password`, `role`, `created_at`, `cancellation_count`) VALUES
(4, 'felps', 'mans', 'grek', 'eaars', 'ir', 'dummy@mail.com', NULL, NULL, 'user', '2024-12-26 11:14:16', 0),
(9, 'felpsoo', 'ert', 'ertgfd', 'swfasdf', 'wesasxdf', 'eltroucko@asdf.com', 'eltroucko', '$2y$10$RgxZz3hxMTaNs7pOzo4b3.mwUs8X8hAwKyfQNSiAiHXVpeSwS0PBO', 'admin', '2024-12-26 11:31:57', 0),
(10, 'John', 'Doe', 'USA', '123 Main St', 'New York', 'john.doe@example.com', 'admin', '$2y$10$Hpt8nLSe9jG1Vw66BsF5G.BiDwBE1bQwZAodDC225ticnrfBd5BUy', 'admin', '2025-01-06 10:00:00', 2),
(12, 'Panos', 'Filippas', 'Greece', 'Test', 'Athens', 'actualhuman@mail.com', 'Manos', '$2y$10$9cUh0cJ.PLpgGpGof0xjxeoHXZ3q3gtIY.nOzHE5iJirhATyQ/tB2', 'admin', '2025-01-12 19:10:42', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `solo_service_id` (`solo_service_name`),
  ADD KEY `team_service_id` (`team_service_name`);

--
-- Indexes for table `solo_services`
--
ALTER TABLE `solo_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_services`
--
ALTER TABLE `team_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `solo_services`
--
ALTER TABLE `solo_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `team_services`
--
ALTER TABLE `team_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `team_services`
--
ALTER TABLE `team_services`
  ADD CONSTRAINT `team_services_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
