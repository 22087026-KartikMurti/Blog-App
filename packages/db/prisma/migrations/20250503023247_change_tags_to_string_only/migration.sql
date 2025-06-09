-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "postId" INTEGER NOT NULL,
    "userIP" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("postId","userIP")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_urlId_key" ON "Post"("urlId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
