-- Enable foreign key CASCADE

ALTER TABLE IF EXISTS "Meal"
DROP CONSTRAINT "Meal_userId_fkey" IF EXISTS,
ADD CONSTRAINT "Meal_userId_fkey"  FOREIGN KEY("userId") REFERENCES "User" ON DELETE CASCADE;

ALTER TABLE IF EXISTS "Menu"
DROP CONSTRAINT "Menu_userId_fkey" IF EXISTS,
ADD CONSTRAINT "Menu_userId_fkey"  FOREIGN KEY("userId") REFERENCES "User" ON DELETE CASCADE;


ALTER TABLE IF EXISTS "Order"
DROP CONSTRAINT "Order_userId_fkey" IF EXISTS,
ADD CONSTRAINT "Order_userId_fkey"  FOREIGN KEY("userId") REFERENCES "User" ON DELETE CASCADE;

ALTER TABLE IF EXISTS "MealsOnOrders"
DROP CONSTRAINT "MealsOnOrders_mealId_fkey" IF EXISTS,
ADD CONSTRAINT "MealsOnOrders_mealId_fkey"  FOREIGN KEY("mealId") REFERENCES "Meal" ON DELETE CASCADE,
DROP CONSTRAINT "MealsOnOrders_orderId_fkey" IF EXISTS,
ADD CONSTRAINT "MealsOnOrders_orderId_fkey"  FOREIGN KEY("orderId") REFERENCES "Order" ON DELETE CASCADE;

ALTER TABLE IF EXISTS "Address"
DROP CONSTRAINT "Address_userId_fkey" IF EXISTS,
ADD CONSTRAINT "Address_userId_fkey"  FOREIGN KEY("userId") REFERENCES "User" ON DELETE CASCADE;

ALTER TABLE IF EXISTS "DefaultAddress"
DROP CONSTRAINT "DefaultAddress_userId_fkey" IF EXISTS,
ADD CONSTRAINT "DefaultAddress_userId_fkey"  FOREIGN KEY("userId") REFERENCES "User" ON DELETE CASCADE;
DROP CONSTRAINT "DefaultAddress_addressId_userId_fkey" IF EXISTS,
ADD CONSTRAINT "DefaultAddress_addressId_userId_fkey"  FOREIGN KEY("addressId", "userId") REFERENCES "User" ON DELETE CASCADE;

-- Add partial unique index

CREATE UNIQUE INDEX  IF NOT EXISTS "userTitle" ON "Meal" ("title", "userId")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX  IF NOT EXISTS "userTitleDeletedAt" ON "Meal" ("title", "userId", "deletedAt")
WHERE "deletedAt" IS NOT NULL;

-- Add trigger function

CREATE OR REPLACE FUNCTION mealmenufunc()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
    DECLARE
   "menuUserId" VARCHAR(255);
   "mealUserId" VARCHAR(255);
    BEGIN
    SELECT "userId" INTO "menuUserId" FROM "Menu" WHERE id = NEW."B";
    SELECT "userId" INTO "mealUserId" FROM "Meal" WHERE id = NEW."A";
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