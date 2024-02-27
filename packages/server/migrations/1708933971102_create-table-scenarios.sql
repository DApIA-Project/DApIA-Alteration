-- Up Migration
CREATE TABLE IF NOT EXISTS "scenarios" ("id" SERIAL PRIMARY KEY,
                                            "name" VARCHAR,
                                            "text" VARCHAR,
                                            "options" JSON,
                                            "user_id" INTEGER NOT NULL,
                                            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                            CONSTRAINT "fk_user_scenario" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
                                        );

-- Down Migration
DROP TABLE "scenarios";