CREATE TABLE `user` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `username` TEXT NOT NULL UNIQUE,
    `email` TEXT NOT NULL UNIQUE,
    `password_hash` TEXT NOT NULL,
    `first_name` TEXT NOT NULL,
    `last_name` TEXT,
    `date_of_birth` DATE NOT NULL,
    `gender` TEXT CHECK(gender IN ('Male', 'Female', 'Other')) NOT NULL,
    `campus` TEXT NOT NULL,
    `branch` TEXT NOT NULL,
    `level` TEXT NOT NULL,
    `location` TEXT NOT NULL,
    `bio` TEXT,
    `profile_picture` TEXT,
    `registration_date` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `like` (
    `id_like` INTEGER PRIMARY KEY AUTOINCREMENT,
    `liker_user_id` INTEGER NOT NULL,
    `liked_user_id` INTEGER NOT NULL,
    `like_datetime` DATETIME NOT NULL,
    FOREIGN KEY (`liker_user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`liked_user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `message` (
    `id_message` INTEGER PRIMARY KEY AUTOINCREMENT,
    `sender_user_id` INTEGER NOT NULL,
    `receiver_user_id` INTEGER NOT NULL,
    `message_text` TEXT NOT NULL,
    `message_datetime` DATETIME NOT NULL,
    FOREIGN KEY (`sender_user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`receiver_user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `photo` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `id_user` INTEGER NOT NULL,
    `photo` INTEGER NOT NULL,
    FOREIGN KEY (`id_user`) REFERENCES `user`(`id`)
);