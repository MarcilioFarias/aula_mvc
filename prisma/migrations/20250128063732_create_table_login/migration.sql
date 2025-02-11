-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "name_login" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "login_name_login_key" ON "login"("name_login");

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
