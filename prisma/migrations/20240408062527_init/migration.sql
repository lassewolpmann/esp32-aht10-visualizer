-- CreateTable
CREATE TABLE "TempHumidityData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temp" REAL NOT NULL,
    "humidity" REAL NOT NULL
);