-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 08:52 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_log_tbl`
--

CREATE TABLE `action_log_tbl` (
  `action_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `action_type` varchar(50) NOT NULL,
  `action_description` text DEFAULT NULL,
  `action_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `depart_tbl`
--

CREATE TABLE `depart_tbl` (
  `depart_id` int(11) NOT NULL,
  `depart_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `depart_tbl`
--

INSERT INTO `depart_tbl` (`depart_id`, `depart_name`) VALUES
(1, 'งานวิทยบริการและสารสนเทศ'),
(4, 'งานวิศวกรรมเครือข่าย');

-- --------------------------------------------------------

--
-- Table structure for table `email_log_tbl`
--

CREATE TABLE `email_log_tbl` (
  `email_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `recipient_email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level_tbl`
--

CREATE TABLE `level_tbl` (
  `level_id` int(11) NOT NULL,
  `level_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `depart_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level_tbl`
--

INSERT INTO `level_tbl` (`level_id`, `level_name`, `depart_id`) VALUES
(2, 'ผู้อำนวยการฝ่ายวิทยบริการและสารสนเทศ', 1),
(6, 'นักวิชาการคอมพิวเตอร์', 4),
(7, 'นักวิชาการคอมพิวเตอร์ชำนาญการปฏิบัติหน้าที่หัวหน้า', 4),
(8, 'บรรณารักษ์', 1);

-- --------------------------------------------------------

--
-- Table structure for table `prefix_tbl`
--

CREATE TABLE `prefix_tbl` (
  `prefix_id` int(11) NOT NULL,
  `prefix_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prefix_tbl`
--

INSERT INTO `prefix_tbl` (`prefix_id`, `prefix_name`) VALUES
(1, 'นาย');

-- --------------------------------------------------------

--
-- Table structure for table `task_tbl`
--

CREATE TABLE `task_tbl` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `assigned_by` varchar(255) NOT NULL,
  `assigned_to` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `task_file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userdata_tbl`
--

CREATE TABLE `userdata_tbl` (
  `userdata_id` int(11) NOT NULL,
  `prefix_id` int(11) NOT NULL,
  `depart_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `userdata_fname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userdata_lname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userdata_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userdata_tell` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdata_tbl`
--

INSERT INTO `userdata_tbl` (`userdata_id`, `prefix_id`, `depart_id`, `level_id`, `user_id`, `userdata_fname`, `userdata_lname`, `userdata_email`, `userdata_tell`) VALUES
(2, 1, 1, 2, 2, 'katatron', 'Lapwong', 'loveboatlnwza@gmail.com', 612242569),
(6, 1, 4, 6, 6, 'KoonBoaT', 'Ch', 'user@gmail.com', 612242569),
(7, 1, 4, 7, 7, 'KoonBoaT', 'Ch', 'manager@gmail.com', 612242569),
(8, 1, 1, 8, 8, 'วิชาการ', 'คงพัน', 'user2@test.com', 878889821);

-- --------------------------------------------------------

--
-- Table structure for table `user_level`
--

CREATE TABLE `user_level` (
  `userlv_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `position` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_level`
--

INSERT INTO `user_level` (`userlv_id`, `user_id`, `position`) VALUES
(2, 2, 'admin'),
(6, 6, 'user'),
(7, 7, 'manager'),
(8, 8, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`user_id`, `username`, `password`, `email`) VALUES
(2, 'admin', '$2y$10$xSMPUo2cyRYkB/AxeMFyTuvCanXliSptAp77fI.U5/0s/6tjfpKxW', 'loveboatlnwza@gmail.com'),
(6, 'user', '$2y$10$mPyxJTlMENvaOcWbm.l4Nu6CEHDjDt8xhFHH.DVL1wKJk/2NQsFzK', 'user@gmail.com'),
(7, 'manager', '$2y$10$CLAyaGTHZE52vPjY7ioeO.x3xHw6T3Gn/mfdEQ2ChHqQ.XzpRj6iG', 'manager@gmail.com'),
(8, 'user5', '$2y$10$uZJ5fsoZNnNnCecXl5gG3.vEvvTtDnGb3yxF2uHUWv5K/rP1iQwsa', 'user2@test.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action_log_tbl`
--
ALTER TABLE `action_log_tbl`
  ADD PRIMARY KEY (`action_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `depart_tbl`
--
ALTER TABLE `depart_tbl`
  ADD PRIMARY KEY (`depart_id`);

--
-- Indexes for table `email_log_tbl`
--
ALTER TABLE `email_log_tbl`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `level_tbl`
--
ALTER TABLE `level_tbl`
  ADD PRIMARY KEY (`level_id`),
  ADD KEY `FK_depart_id` (`depart_id`);

--
-- Indexes for table `prefix_tbl`
--
ALTER TABLE `prefix_tbl`
  ADD PRIMARY KEY (`prefix_id`);

--
-- Indexes for table `task_tbl`
--
ALTER TABLE `task_tbl`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `userdata_tbl`
--
ALTER TABLE `userdata_tbl`
  ADD PRIMARY KEY (`userdata_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `prefix_id` (`prefix_id`),
  ADD KEY `depart_id` (`depart_id`);

--
-- Indexes for table `user_level`
--
ALTER TABLE `user_level`
  ADD PRIMARY KEY (`userlv_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action_log_tbl`
--
ALTER TABLE `action_log_tbl`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `depart_tbl`
--
ALTER TABLE `depart_tbl`
  MODIFY `depart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `email_log_tbl`
--
ALTER TABLE `email_log_tbl`
  MODIFY `email_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `level_tbl`
--
ALTER TABLE `level_tbl`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `prefix_tbl`
--
ALTER TABLE `prefix_tbl`
  MODIFY `prefix_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task_tbl`
--
ALTER TABLE `task_tbl`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userdata_tbl`
--
ALTER TABLE `userdata_tbl`
  MODIFY `userdata_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_level`
--
ALTER TABLE `user_level`
  MODIFY `userlv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_tbl`
--
ALTER TABLE `user_tbl`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `action_log_tbl`
--
ALTER TABLE `action_log_tbl`
  ADD CONSTRAINT `action_log_tbl_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task_tbl` (`task_id`);

--
-- Constraints for table `level_tbl`
--
ALTER TABLE `level_tbl`
  ADD CONSTRAINT `FK_depart_id` FOREIGN KEY (`depart_id`) REFERENCES `depart_tbl` (`depart_id`);

--
-- Constraints for table `task_tbl`
--
ALTER TABLE `task_tbl`
  ADD CONSTRAINT `task_tbl_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `user_tbl` (`user_id`);

--
-- Constraints for table `userdata_tbl`
--
ALTER TABLE `userdata_tbl`
  ADD CONSTRAINT `depart_id` FOREIGN KEY (`depart_id`) REFERENCES `depart_tbl` (`depart_id`),
  ADD CONSTRAINT `level_id` FOREIGN KEY (`level_id`) REFERENCES `level_tbl` (`level_id`),
  ADD CONSTRAINT `prefix_id` FOREIGN KEY (`prefix_id`) REFERENCES `prefix_tbl` (`prefix_id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`);

--
-- Constraints for table `user_level`
--
ALTER TABLE `user_level`
  ADD CONSTRAINT `user_level_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
