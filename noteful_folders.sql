-- CREATE TYPE <table> only used with enum's
BEGIN;
INSERT INTO "folders" (name)
VALUES 
("test folder");

COMMIT;