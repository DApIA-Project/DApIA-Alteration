-- Up Migration
CREATE TABLE IF NOT EXISTS "users" ("id" SERIAL PRIMARY KEY,
                                    "firstname" VARCHAR(255) NOT NULL,
                                    "lastname" VARCHAR(255) NOT NULL,
                                    "email" VARCHAR(255) UNIQUE NOT NULL,
                                    "password" VARCHAR(255) NOT NULL,
                                    "is_admin" BOOLEAN NOT NULL,
                                    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL
                                    );

-- Down Migration
DROP TABLE "users";
