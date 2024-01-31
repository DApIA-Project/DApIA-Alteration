-- Up Migration
CREATE TABLE IF NOT EXISTS "scenarios" ("id" SERIAL PRIMARY KEY,
                                            "name" VARCHAR,
                                            "text" VARCHAR,
                                            "options" JSON,
                                            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL
                                        );

-- Down Migration
DROP TABLE "scenarios";