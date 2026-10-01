CREATE TABLE IF NOT EXISTS `ProductDiscovery` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `userId` INTEGER NOT NULL,
  `productName` VARCHAR(120) NOT NULL,
  `brand` VARCHAR(80) NOT NULL,
  `productKey` CHAR(64) NOT NULL,
  `imageHash` CHAR(64) NOT NULL,
  `review` TEXT NOT NULL,
  `rating` INTEGER NULL,
  `discoveredOn` CHAR(10) NOT NULL,
  `version` INTEGER NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ProductDiscovery_userId_productKey_key` (`userId`, `productKey`),
  UNIQUE INDEX `ProductDiscovery_userId_imageHash_key` (`userId`, `imageHash`),
  INDEX `ProductDiscovery_userId_id_idx` (`userId`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ProductDiscoveryImage` (
  `discoveryId` INTEGER NOT NULL,
  `bytes` MEDIUMBLOB NOT NULL,
  `thumbnail` MEDIUMBLOB NOT NULL,
  PRIMARY KEY (`discoveryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
