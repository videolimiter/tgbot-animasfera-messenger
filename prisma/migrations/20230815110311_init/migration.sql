-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" INTEGER NOT NULL,
    "animasferaId" INTEGER,
    "tgUsername" TEXT,
    "tgFirstName" TEXT,
    "tgLastName" TEXT,
    "isBot" BOOLEAN,
    "tgLanguage" TEXT NOT NULL DEFAULT 'ru'
);

-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hashedToken" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chatId_key" ON "User"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "User_animasferaId_key" ON "User"("animasferaId");

-- CreateIndex
CREATE UNIQUE INDEX "User_tgUsername_key" ON "User"("tgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_key" ON "Token"("hashedToken");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_type_key" ON "Token"("userId", "type");
