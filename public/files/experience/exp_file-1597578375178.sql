-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2020 at 04:10 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `connect_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `certifications`
--

CREATE TABLE `certifications` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `contract_status` varchar(255) DEFAULT NULL,
  `contract_acceptance` varchar(255) DEFAULT NULL,
  `contract_note` varchar(255) DEFAULT NULL,
  `contract_freelance_review` varchar(255) DEFAULT NULL,
  `contract_client_review` varchar(255) DEFAULT NULL,
  `contract_freelance_rating` int(11) DEFAULT NULL,
  `contract_client_rating` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `years` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobapplications`
--

CREATE TABLE `jobapplications` (
  `id` int(11) NOT NULL,
  `FreelanceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `JobId` int(11) DEFAULT NULL,
  `application_status` varchar(255) DEFAULT NULL,
  `application_message` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobcategories`
--

CREATE TABLE `jobcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobcategories`
--

INSERT INTO `jobcategories` (`id`, `name`, `picture`, `createdAt`, `updatedAt`) VALUES
(1, 'Video Editing', NULL, '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(2, 'Photography', NULL, '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(3, 'Data Analysis', NULL, '2020-05-25 00:00:00', '2020-05-25 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `jobfiles`
--

CREATE TABLE `jobfiles` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobpayments`
--

CREATE TABLE `jobpayments` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `free_amount` varchar(255) DEFAULT NULL,
  `clientPaymentReceipt` varchar(255) DEFAULT NULL,
  `clientPay` tinyint(1) DEFAULT NULL,
  `freelancePay` tinyint(1) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobreports`
--

CREATE TABLE `jobreports` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `report` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `ClientId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `CatId` int(11) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `job_details` varchar(255) DEFAULT NULL,
  `job_timeLength` varchar(255) DEFAULT NULL,
  `job_price` decimal(6,2) DEFAULT NULL,
  `job_status` varchar(255) DEFAULT NULL,
  `job_jobType` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobskills`
--

CREATE TABLE `jobskills` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `job_skill_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `SenderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ReceiverId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `ReceiverId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `paymentdetails`
--

CREATE TABLE `paymentdetails` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `apikey` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `projectLinks` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'client', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(2, 'freelancer', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(3, 'admin', '2020-05-25 00:00:00', '2020-05-25 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `selectedjobs`
--

CREATE TABLE `selectedjobs` (
  `id` int(11) NOT NULL,
  `ClientId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `FreelancerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `JobId` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200515003235-create-role.js'),
('20200515003238-create-user-account.js'),
('20200515003518-create-user.js'),
('20200515003600-create-job-category.js'),
('20200515003627-create-job.js'),
('20200515003628-create-job-skills.js'),
('20200515003629-create-selected-job.js'),
('20200515003712-create-job-application.js'),
('20200515003918-create-job-payment.js'),
('20200515004140-create-chat.js'),
('20200515004219-create-notification.js'),
('20200515004308-create-user-payment-info.js'),
('20200515004349-create-payment-details.js'),
('20200519200442-create-contract.js'),
('20200519200530-create-job-report.js'),
('20200527145902-create-job-files.js'),
('20200529220237-create-portfolio.js'),
('20200530114452-create-message.js'),
('20200605114652-create-certification.js'),
('20200702092420-create-experience.js'),
('20200702092421-create-skills.js'),
('20200702092421-create-user-skills.js');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'JavaScript', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(2, 'Django', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(3, 'Python', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(4, 'Java', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(5, 'Mongo DB', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(6, 'C++', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(7, 'Android', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(8, 'Figma', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(9, 'Angular', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(10, 'Adobe XD', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(11, 'MySQL', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(12, 'Bootstrap', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(13, 'CSS', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(14, 'Kotlin', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(15, 'illustrator', '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(16, 'Flutter', '2020-05-25 00:00:00', '2020-05-25 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `useraccounts`
--

CREATE TABLE `useraccounts` (
  `user_account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `first_time` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `email_hash` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `useraccounts`
--

INSERT INTO `useraccounts` (`user_account_id`, `email`, `password`, `verified`, `first_time`, `blocked`, `role_id`, `token`, `email_hash`, `createdAt`, `updatedAt`) VALUES
('32fe0cf3-d47d-452b-aae8-06d16a5fa520', 'admin@amalitech.com', '570783d44d0cb688b7fc16884f0d2731f61dea3f270a42e84fd501f61055f439', 1, NULL, NULL, 3, NULL, NULL, '2020-05-25', '2020-05-25 00:00:00'),
('5cfccad7-7e8c-4960-91b4-945d64414a60', 'nicholas.dickson@amalitech.com', '3b4e968061bfbd13c2a6c38e1bf43e33a035270329fe4416542c8c462d2dbf6d', 1, 1, 0, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJuaWNob2xhcy5kaWNrc29uQGFtYWxpdGVjaC5jb20iLCJpYXQiOjE1OTY3MjEyNjIsImV4cCI6MTU5NjgwNzY2Mn0.EQbfjpIuY5Jaj-jDMVP16I_Ygc8wlq1WAXWrMxqbH0w', 'd273be209218a89ba49eb4d7c185ffe583d8bc62c336885fa6c11c8af77b6d58', '2020-08-06', '2020-08-06 13:41:11');

-- --------------------------------------------------------

--
-- Table structure for table `userpaymentinfos`
--

CREATE TABLE `userpaymentinfos` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `accountNumber` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `golden_paragraph` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `country_code` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_account_id`, `first_name`, `last_name`, `job_title`, `availability`, `golden_paragraph`, `gender`, `date_of_birth`, `country_code`, `phone`, `country`, `city`, `picture`, `createdAt`, `updatedAt`) VALUES
(7, '5cfccad7-7e8c-4960-91b4-945d64414a60', '', '', '', '', '', '', '0000-00-00', '', '', '', '', NULL, '2020-08-06 13:41:02', '2020-08-06 13:41:02');

-- --------------------------------------------------------

--
-- Table structure for table `userskills`
--

CREATE TABLE `userskills` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `skills_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certifications`
--
ALTER TABLE `certifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `jobapplications`
--
ALTER TABLE `jobapplications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FreelanceId` (`FreelanceId`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `jobcategories`
--
ALTER TABLE `jobcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobfiles`
--
ALTER TABLE `jobfiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `jobpayments`
--
ALTER TABLE `jobpayments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `jobreports`
--
ALTER TABLE `jobreports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ClientId` (`ClientId`),
  ADD KEY `CatId` (`CatId`);

--
-- Indexes for table `jobskills`
--
ALTER TABLE `jobskills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SenderId` (`SenderId`),
  ADD KEY `ReceiverId` (`ReceiverId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ReceiverId` (`ReceiverId`);

--
-- Indexes for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selectedjobs`
--
ALTER TABLE `selectedjobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ClientId` (`ClientId`),
  ADD KEY `FreelancerId` (`FreelancerId`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `useraccounts`
--
ALTER TABLE `useraccounts`
  ADD PRIMARY KEY (`user_account_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `userpaymentinfos`
--
ALTER TABLE `userpaymentinfos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_account_id` (`user_account_id`);

--
-- Indexes for table `userskills`
--
ALTER TABLE `userskills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `certifications`
--
ALTER TABLE `certifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobapplications`
--
ALTER TABLE `jobapplications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobcategories`
--
ALTER TABLE `jobcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobfiles`
--
ALTER TABLE `jobfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobpayments`
--
ALTER TABLE `jobpayments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobreports`
--
ALTER TABLE `jobreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobskills`
--
ALTER TABLE `jobskills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `selectedjobs`
--
ALTER TABLE `selectedjobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `userpaymentinfos`
--
ALTER TABLE `userpaymentinfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `userskills`
--
ALTER TABLE `userskills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certifications`
--
ALTER TABLE `certifications`
  ADD CONSTRAINT `certifications_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `jobapplications`
--
ALTER TABLE `jobapplications`
  ADD CONSTRAINT `jobapplications_ibfk_1` FOREIGN KEY (`FreelanceId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobapplications_ibfk_2` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobfiles`
--
ALTER TABLE `jobfiles`
  ADD CONSTRAINT `jobfiles_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobfiles_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `jobpayments`
--
ALTER TABLE `jobpayments`
  ADD CONSTRAINT `jobpayments_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobreports`
--
ALTER TABLE `jobreports`
  ADD CONSTRAINT `jobreports_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobreports_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`CatId`) REFERENCES `jobcategories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `jobskills`
--
ALTER TABLE `jobskills`
  ADD CONSTRAINT `jobskills_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`SenderId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`ReceiverId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`ReceiverId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  ADD CONSTRAINT `paymentdetails_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `selectedjobs`
--
ALTER TABLE `selectedjobs`
  ADD CONSTRAINT `selectedjobs_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `selectedjobs_ibfk_2` FOREIGN KEY (`FreelancerId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `selectedjobs_ibfk_3` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `useraccounts`
--
ALTER TABLE `useraccounts`
  ADD CONSTRAINT `useraccounts_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userpaymentinfos`
--
ALTER TABLE `userpaymentinfos`
  ADD CONSTRAINT `userpaymentinfos_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_account_id`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;

--
-- Constraints for table `userskills`
--
ALTER TABLE `userskills`
  ADD CONSTRAINT `userskills_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `useraccounts` (`user_account_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
