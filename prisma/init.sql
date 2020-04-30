CREATE TABLE IF NOT EXISTS "User" (
    "id" VARCHAR(25) PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS "Meal" (
    "id" VARCHAR(25) PRIMARY KEY,
    "userId" VARCHAR(25) NOT NULL REFERENCES "User" ON DELETE CASCADE,
    "title" VARCHAR(255) NOT NULL,
    "tags" _VARCHAR(255),
    "description" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "price" INT4 NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),
    "deletedAt" timestamptz,

    CONSTRAINT "mealMine" UNIQUE("id", "userId")
);

CREATE UNIQUE INDEX  IF NOT EXISTS "userTitle" ON "Meal" ("title", "userId")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX  IF NOT EXISTS "userTitleDeletedAt" ON "Meal" ("title", "userId", "deletedAt")
WHERE "deletedAt" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "Menu" (
    "id" VARCHAR(25) PRIMARY KEY,
    "userId" VARCHAR(25) NOT NULL REFERENCES "User" ON DELETE CASCADE,
    "menuDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),

    CONSTRAINT "menuMine" UNIQUE("menuDate", "userId")
);

CREATE TABLE IF NOT EXISTS "_MealMenu" (
    "A" VARCHAR(255) NOT NULL REFERENCES "Meal" ON DELETE CASCADE,
    "B" VARCHAR(255) NOT NULL REFERENCES "Menu" ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "mealMenu" ON "_MealMenu" ("A", "B");
CREATE INDEX IF NOT EXISTS "mealMenuB" ON "_MealMenu" ("B");

CREATE TABLE IF NOT EXISTS "Order" (
    "id" VARCHAR(25) PRIMARY KEY,
    "userId" VARCHAR(25) NOT NULL REFERENCES "User" ON DELETE CASCADE,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),

    CONSTRAINT "orderMine" UNIQUE("id", "userId")
);

CREATE TABLE IF NOT EXISTS "MealsOnOrders" (
    "id" VARCHAR(25) PRIMARY KEY,
    "mealId" VARCHAR(25) NOT NULL REFERENCES "Meal" ON DELETE CASCADE,
    "orderId" VARCHAR(25) NOT NULL REFERENCES "Order" ON DELETE CASCADE,
    "quantity" INT4 NOT NULL DEFAULT 1,
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "mealsOnOrders" ON "MealsOnOrders" ("mealId", "orderId");

CREATE TABLE IF NOT EXISTS "Address" (
    "id" VARCHAR(25) PRIMARY KEY,
    "userId" VARCHAR(25) NOT NULL REFERENCES "User" ON DELETE CASCADE,
    "street1" VARCHAR(255) NOT NULL,
    "street2" VARCHAR(255) NOT NULL,
    "lga" VARCHAR(255) NOT NULL,
    "areaCode" INT4 NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),

    CONSTRAINT "addressMine" UNIQUE("id", "userId")
);

CREATE TABLE IF NOT EXISTS "DefaultAddress" (
    "id" VARCHAR(25) PRIMARY KEY,
    "userId" VARCHAR(25) NOT NULL REFERENCES "User" ON DELETE CASCADE,
    "addressId" VARCHAR(25) NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),

    CONSTRAINT "defaultAddress" FOREIGN KEY ("addressId", "userId")
        REFERENCES "Address" (id, "userId") ON UPDATE CASCADE
);

CREATE OR REPLACE FUNCTION mealmenufunc()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
    DECLARE
   "menuUserId" VARCHAR(255);
   "mealUserId" VARCHAR(255);
    BEGIN
    SELECT "userId" INTO "menuUserId" FROM "Menu" WHERE id = NEW."menuId";
    SELECT "userId" INTO "mealUserId" FROM "Meal" WHERE id = NEW."mealId";
       IF ("menuUserId"<>"mealUserId")  THEN
            RAISE EXCEPTION 'userId fields on meal and menu do not match';
      END IF;
      RETURN NEW;
    END;
    $function$;
DROP TRIGGER IF EXISTS every_menu_meals
    ON "_MealMenu";
CREATE TRIGGER every_menu_meals 
    BEFORE INSERT OR UPDATE OR DELETE
    ON "_MealMenu" 
    FOR EACH ROW EXECUTE PROCEDURE mealmenufunc();