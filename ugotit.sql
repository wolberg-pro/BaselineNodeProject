-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 01, 2020 at 03:05 PM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ugotit`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_providers`
--

CREATE TABLE `auth_providers` (
  `id` int(11) NOT NULL,
  `type` enum('facebook','google') NOT NULL,
  `client_id` varchar(255) NOT NULL,
  `secret` varchar(500) NOT NULL,
  `redirect_callback` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` int(11) NOT NULL,
  `description` int(11) NOT NULL,
  `image_media_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` int(10) UNSIGNED NOT NULL,
  `symbol` varchar(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `code` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `symbol`, `name`, `code`) VALUES
(1, 'Lek', 'Leke', 'ALL'),
(2, '$', 'Dollars', 'USD'),
(3, '؋', 'Afghanis', 'AFN'),
(4, '$', 'Pesos', 'ARS'),
(5, 'ƒ', 'Guilders', 'AWG'),
(6, '$', 'Dollars', 'AUD'),
(7, 'ман', 'New Manats', 'AZN'),
(8, '$', 'Dollars', 'BSD'),
(9, '$', 'Dollars', 'BBD'),
(10, 'p.', 'Rubles', 'BYR'),
(11, '€', 'Euro', 'EUR'),
(12, 'BZ$', 'Dollars', 'BZD'),
(13, '$', 'Dollars', 'BMD'),
(14, '$b', 'Bolivianos', 'BOB'),
(15, 'KM', 'Convertible Marka', 'BAM'),
(16, 'P', 'Pula', 'BWP'),
(17, 'лв', 'Leva', 'BGN'),
(18, 'R$', 'Reais', 'BRL'),
(19, '£', 'Pounds', 'GBP'),
(20, '$', 'Dollars', 'BND'),
(21, '៛', 'Riels', 'KHR'),
(22, '$', 'Dollars', 'CAD'),
(23, '$', 'Dollars', 'KYD'),
(24, '$', 'Pesos', 'CLP'),
(25, '¥', 'Yuan Renminbi', 'CNY'),
(26, '$', 'Pesos', 'COP'),
(27, '₡', 'Colón', 'CRC'),
(28, 'kn', 'Kuna', 'HRK'),
(29, '₱', 'Pesos', 'CUP'),
(30, 'Kč', 'Koruny', 'CZK'),
(31, 'kr', 'Kroner', 'DKK'),
(32, 'RD$', 'Pesos', 'DOP'),
(33, '$', 'Dollars', 'XCD'),
(34, '£', 'Pounds', 'EGP'),
(35, '$', 'Colones', 'SVC'),
(36, '£', 'Pounds', 'FKP'),
(37, '$', 'Dollars', 'FJD'),
(38, '¢', 'Cedis', 'GHC'),
(39, '£', 'Pounds', 'GIP'),
(40, 'Q', 'Quetzales', 'GTQ'),
(41, '£', 'Pounds', 'GGP'),
(42, '$', 'Dollars', 'GYD'),
(43, 'L', 'Lempiras', 'HNL'),
(44, '$', 'Dollars', 'HKD'),
(45, 'Ft', 'Forint', 'HUF'),
(46, 'kr', 'Kronur', 'ISK'),
(47, 'Rp', 'Rupees', 'INR'),
(48, 'Rp', 'Rupiahs', 'IDR'),
(49, '﷼', 'Rials', 'IRR'),
(50, '£', 'Pounds', 'IMP'),
(51, '₪', 'New Shekels', 'ILS'),
(52, 'J$', 'Dollars', 'JMD'),
(53, '¥', 'Yen', 'JPY'),
(54, '£', 'Pounds', 'JEP'),
(55, 'лв', 'Tenge', 'KZT'),
(56, '₩', 'Won', 'KPW'),
(57, '₩', 'Won', 'KRW'),
(58, 'лв', 'Soms', 'KGS'),
(59, '₭', 'Kips', 'LAK'),
(60, 'Ls', 'Lati', 'LVL'),
(61, '£', 'Pounds', 'LBP'),
(62, '$', 'Dollars', 'LRD'),
(63, 'CHF', 'Switzerland Francs', 'CHF'),
(64, 'Lt', 'Litai', 'LTL'),
(65, 'ден', 'Denars', 'MKD'),
(66, 'RM', 'Ringgits', 'MYR'),
(67, '₨', 'Rupees', 'MUR'),
(68, '$', 'Pesos', 'MXN'),
(69, '₮', 'Tugriks', 'MNT'),
(70, 'MT', 'Meticais', 'MZN'),
(71, '$', 'Dollars', 'NAD'),
(72, '₨', 'Rupees', 'NPR'),
(73, 'ƒ', 'Guilders', 'ANG'),
(74, '$', 'Dollars', 'NZD'),
(75, 'C$', 'Cordobas', 'NIO'),
(76, '₦', 'Nairas', 'NGN'),
(77, 'kr', 'Krone', 'NOK'),
(78, '﷼', 'Rials', 'OMR'),
(79, '₨', 'Rupees', 'PKR'),
(80, 'B/.', 'Balboa', 'PAB'),
(81, 'Gs', 'Guarani', 'PYG'),
(82, 'S/.', 'Nuevos Soles', 'PEN'),
(83, 'Php', 'Pesos', 'PHP'),
(84, 'zł', 'Zlotych', 'PLN'),
(85, '﷼', 'Rials', 'QAR'),
(86, 'lei', 'New Lei', 'RON'),
(87, 'руб', 'Rubles', 'RUB'),
(88, '£', 'Pounds', 'SHP'),
(89, '﷼', 'Riyals', 'SAR'),
(90, 'Дин.', 'Dinars', 'RSD'),
(91, '₨', 'Rupees', 'SCR'),
(92, '$', 'Dollars', 'SGD'),
(93, '$', 'Dollars', 'SBD'),
(94, 'S', 'Shillings', 'SOS'),
(95, 'R', 'Rand', 'ZAR'),
(96, '₨', 'Rupees', 'LKR'),
(97, 'kr', 'Kronor', 'SEK'),
(98, '$', 'Dollars', 'SRD'),
(99, '£', 'Pounds', 'SYP'),
(100, 'NT$', 'New Dollars', 'TWD'),
(101, '฿', 'Baht', 'THB'),
(102, 'TT$', 'Dollars', 'TTD'),
(103, '₺', 'Lira', 'TRY'),
(104, '£', 'Liras', 'TRL'),
(105, '$', 'Dollars', 'TVD'),
(106, '₴', 'Hryvnia', 'UAH'),
(107, '$U', 'Pesos', 'UYU'),
(108, 'лв', 'Sums', 'UZS'),
(109, 'Bs', 'Bolivares Fuertes', 'VEF'),
(110, '₫', 'Dong', 'VND'),
(111, '﷼', 'Rials', 'YER'),
(112, 'Z$', 'Zimbabwe Dollars', 'ZWD'),
(113, '₹', 'Rupees', 'INR');

-- --------------------------------------------------------

--
-- Table structure for table `deals`
--

CREATE TABLE `deals` (
  `id` int(10) UNSIGNED NOT NULL,
  `current_revision_id` int(10) UNSIGNED NOT NULL COMMENT 'to any deal will create revision this never null',
  `user_id` int(10) UNSIGNED NOT NULL,
  `used_currency_id` int(10) UNSIGNED NOT NULL COMMENT 'the currency of the price',
  `category_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(500) NOT NULL COMMENT 'title of the deal',
  `short_description` varchar(200) NOT NULL,
  `description` mediumtext NOT NULL COMMENT 'description of the deal',
  `more_info` mediumtext NOT NULL,
  `main_media_id` int(10) UNSIGNED NOT NULL COMMENT 'is of the main image that show the deal',
  `drafted_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is drafted',
  `published_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is published',
  `freeze_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is frozen',
  `freeze_expired_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is frozen will remove at ',
  `client_delivery_location_at` timestamp NULL DEFAULT NULL COMMENT 'do we have delivery on client location if not null',
  `client_delivery_location_fee` decimal(10,0) DEFAULT NULL COMMENT 'do we have delivery on client location at a fee',
  `client_service_location_at` timestamp NULL DEFAULT NULL COMMENT 'do we have service on client location if not null',
  `client_service_location_fee` decimal(10,0) DEFAULT NULL COMMENT 'do we have service on client location at a fee',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'soft delete if not null',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_days`
--

CREATE TABLE `deal_days` (
  `id` int(11) UNSIGNED NOT NULL,
  `deal_id` int(11) NOT NULL,
  `current_revision_id` int(10) UNSIGNED NOT NULL,
  `is_open_all_day` int(11) NOT NULL,
  `day` varchar(10) NOT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_extra`
--

CREATE TABLE `deal_extra` (
  `id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `current_revision_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `quntity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` int(11) NOT NULL,
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_extra_history`
--

CREATE TABLE `deal_extra_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `quntity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` int(11) NOT NULL,
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_feedbacks`
--

CREATE TABLE `deal_feedbacks` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `stars` smallint(6) NOT NULL,
  `context` text NOT NULL COMMENT 'the user feedback text',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_history`
--

CREATE TABLE `deal_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `used_currency_id` int(10) UNSIGNED NOT NULL COMMENT 'the currency of the price',
  `title` varchar(500) NOT NULL COMMENT 'title of the deal',
  `short_description` varchar(200) NOT NULL,
  `description` mediumtext NOT NULL COMMENT 'description of the deal',
  `more_info` mediumtext NOT NULL,
  `main_media_id` int(10) UNSIGNED NOT NULL COMMENT 'is of the main image that show the deal',
  `drafted_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is drafted',
  `published_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is published',
  `freeze_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is frozen',
  `freeze_expired_at` timestamp NULL DEFAULT NULL COMMENT 'if not null the deal is frozen will remove at ',
  `client_delivery_location_at` timestamp NULL DEFAULT NULL COMMENT 'do we have delivery on client location if not null',
  `client_delivery_location_fee` decimal(10,0) DEFAULT NULL COMMENT 'do we have delivery on client location at a fee',
  `client_service_location_at` timestamp NULL DEFAULT NULL COMMENT 'do we have service on client location if not null',
  `client_service_location_fee` decimal(10,0) DEFAULT NULL COMMENT 'do we have service on client location at a fee',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'soft delete if not null',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_locations`
--

CREATE TABLE `deal_locations` (
  `id` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL,
  `current_revision_id` int(10) UNSIGNED NOT NULL,
  `lon` decimal(10,0) NOT NULL,
  `lat` decimal(10,0) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_locations_history`
--

CREATE TABLE `deal_locations_history` (
  `id` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL,
  `lon` decimal(10,0) NOT NULL,
  `lat` decimal(10,0) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_packs`
--

CREATE TABLE `deal_packs` (
  `id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `current_revision_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `max_items_orders` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` int(11) NOT NULL,
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_packs_history`
--

CREATE TABLE `deal_packs_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `max_items_orders` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_photos`
--

CREATE TABLE `deal_photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL COMMENT 'to what deal this photo belong',
  `photo_media_id` int(10) UNSIGNED NOT NULL COMMENT 'ref to media table',
  `thumbnail_media_id` int(10) UNSIGNED NOT NULL COMMENT 'ref to media table',
  `alt` varchar(500) NOT NULL,
  `title` varchar(500) NOT NULL,
  `active_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_ranking`
--

CREATE TABLE `deal_ranking` (
  `id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `emoji_id` int(10) UNSIGNED NOT NULL,
  `counter` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deal_ranking_matching`
--

CREATE TABLE `deal_ranking_matching` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `deal_id` int(10) UNSIGNED NOT NULL,
  `emoji_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `emojis`
--

CREATE TABLE `emojis` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` int(10) UNSIGNED NOT NULL,
  `image_media_id` int(10) UNSIGNED NOT NULL,
  `show_bar_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(30) NOT NULL,
  `description` mediumtext NOT NULL,
  `active_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `phone_validation_codes`
--

CREATE TABLE `phone_validation_codes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `expired_at` timestamp NULL DEFAULT NULL,
  `validated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ranks`
--

CREATE TABLE `ranks` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL COMMENT 'rank name',
  `description` mediumtext COMMENT 'rank description',
  `is_dealer_rank` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'is this rank is for user type dealers',
  `icon` varchar(255) DEFAULT NULL COMMENT 'icon of the rank',
  `active_at` timestamp NULL DEFAULT NULL COMMENT 'is active and when when',
  `orderRank` int(11) NOT NULL COMMENT 'order of the rank (1 rank , last rank)',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(30) NOT NULL,
  `description` mediumtext,
  `active_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles_has_permissions`
--

CREATE TABLE `roles_has_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `enabled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='this table check if user has permission';

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `key` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `contextJSON` json DEFAULT NULL,
  `context` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`key`, `description`, `contextJSON`, `context`, `created_at`, `updated_at`) VALUES
('per_page_default', 'defualt per page will effect when not match to per_page_options', NULL, '20', '2020-03-16 07:29:46', '2020-03-16 07:29:46'),
('per_page_options', 'how many items can user select per page', '[20, 50, 100, 200]', NULL, '2020-03-16 07:29:45', '2020-03-16 07:29:45'),
('limit_deal_packs', 'how many packs a deal can have (globaly)', NULL, '5', NULL, NULL),
('limit_deal_extra', 'how many extra a deal can have (globaly)', NULL, '5', NULL, NULL),
('default_currency_id', 'will auto select currency (or use that currency if selection not found) ', NULL, '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `phone_validation_at` timestamp NULL DEFAULT NULL,
  `active_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users_has_auth_providers`
--

CREATE TABLE `users_has_auth_providers` (
  `user_id` int(11) NOT NULL,
  `auth_provider_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users_has_permissions`
--

CREATE TABLE `users_has_permissions` (
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `enabled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='this table check if user has permission';

-- --------------------------------------------------------

--
-- Table structure for table `users_has_roles`
--

CREATE TABLE `users_has_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `enabled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='this table check if user has roles';

-- --------------------------------------------------------

--
-- Table structure for table `user_dealers`
--

CREATE TABLE `user_dealers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('in-progess','qualified','suspended') NOT NULL DEFAULT 'in-progess',
  `title` varchar(200) NOT NULL,
  `intro` varchar(500) NOT NULL,
  `description` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_locations`
--

CREATE TABLE `user_locations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lon` decimal(10,0) NOT NULL,
  `lat` decimal(10,0) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_media`
--

CREATE TABLE `user_media` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `collection_name` varchar(150) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `mine_type` varchar(50) NOT NULL,
  `remote_address` varchar(255) NOT NULL,
  `file_ext` varchar(6) NOT NULL,
  `custom_properties` json DEFAULT NULL,
  `conversions` json DEFAULT NULL,
  `bucket` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_photos`
--

CREATE TABLE `user_photos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `photo_media_id` int(11) NOT NULL,
  `thumbnail_media_id` int(11) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_profile` tinyint(1) NOT NULL,
  `is_main_profile` tinyint(1) NOT NULL,
  `position` int(11) NOT NULL,
  `active_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `avatar_media_id` int(10) UNSIGNED DEFAULT NULL,
  `profile_media_id` int(11) UNSIGNED DEFAULT NULL COMMENT 'he / she profile image',
  `description` mediumtext,
  `rank_id` int(11) UNSIGNED DEFAULT NULL COMMENT 'the rank of user',
  `type` enum('dealer','member') NOT NULL DEFAULT 'member' COMMENT 'type of user he/she belong to'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_stats`
--

CREATE TABLE `user_stats` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `total_deals` int(11) NOT NULL,
  `total_orders` int(11) NOT NULL,
  `total_clients` int(11) NOT NULL,
  `avg_starts_by_orders` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='the stats of the user will update twice a away every raw';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_providers`
--
ALTER TABLE `auth_providers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `code` (`code`);

--
-- Indexes for table `deals`
--
ALTER TABLE `deals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deal_days`
--
ALTER TABLE `deal_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `current_revision_id` (`current_revision_id`);

--
-- Indexes for table `deal_feedbacks`
--
ALTER TABLE `deal_feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`deal_id`);

--
-- Indexes for table `deal_packs`
--
ALTER TABLE `deal_packs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deal_id` (`deal_id`,`current_revision_id`);

--
-- Indexes for table `deal_photos`
--
ALTER TABLE `deal_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deal_id` (`deal_id`),
  ADD KEY `photo_media_id` (`photo_media_id`,`thumbnail_media_id`);

--
-- Indexes for table `deal_ranking`
--
ALTER TABLE `deal_ranking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deal_id` (`deal_id`,`emoji_id`);

--
-- Indexes for table `deal_ranking_matching`
--
ALTER TABLE `deal_ranking_matching`
  ADD PRIMARY KEY (`user_id`,`deal_id`,`emoji_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_permissions` (`name`,`slug`);

--
-- Indexes for table `phone_validation_codes`
--
ALTER TABLE `phone_validation_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `name` (`name`,`slug`);

--
-- Indexes for table `roles_has_permissions`
--
ALTER TABLE `roles_has_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `fk_roles_permission_permission_id` (`permission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_users` (`email`,`username`);

--
-- Indexes for table `users_has_auth_providers`
--
ALTER TABLE `users_has_auth_providers`
  ADD PRIMARY KEY (`user_id`,`auth_provider_id`),
  ADD KEY `fk_auth_providers` (`auth_provider_id`);

--
-- Indexes for table `users_has_permissions`
--
ALTER TABLE `users_has_permissions`
  ADD PRIMARY KEY (`user_id`,`permission_id`),
  ADD KEY `fk_users_permission_permission_id` (`permission_id`);

--
-- Indexes for table `users_has_roles`
--
ALTER TABLE `users_has_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `fk_users_roles_role_id` (`role_id`);

--
-- Indexes for table `user_media`
--
ALTER TABLE `user_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_photos`
--
ALTER TABLE `user_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `avatar_media_id` (`avatar_media_id`),
  ADD KEY `fk_user_profile_ranks` (`rank_id`);

--
-- Indexes for table `user_stats`
--
ALTER TABLE `user_stats`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_providers`
--
ALTER TABLE `auth_providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `deal_days`
--
ALTER TABLE `deal_days`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deal_feedbacks`
--
ALTER TABLE `deal_feedbacks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deal_packs`
--
ALTER TABLE `deal_packs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deal_photos`
--
ALTER TABLE `deal_photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deal_ranking`
--
ALTER TABLE `deal_ranking`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phone_validation_codes`
--
ALTER TABLE `phone_validation_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_media`
--
ALTER TABLE `user_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_photos`
--
ALTER TABLE `user_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_stats`
--
ALTER TABLE `user_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `roles_has_permissions`
--
ALTER TABLE `roles_has_permissions`
  ADD CONSTRAINT `fk_roles_permission_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_roles_permissions_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_has_auth_providers`
--
ALTER TABLE `users_has_auth_providers`
  ADD CONSTRAINT `fk_auth_providers` FOREIGN KEY (`auth_provider_id`) REFERENCES `auth_providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_has_permissions`
--
ALTER TABLE `users_has_permissions`
  ADD CONSTRAINT `fk_users_permission_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_permission_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_has_roles`
--
ALTER TABLE `users_has_roles`
  ADD CONSTRAINT `fk_users_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_roles_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `fk_user_profile_ranks` FOREIGN KEY (`rank_id`) REFERENCES `ranks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_user_profile_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
