-- CreateTable
CREATE TABLE "Views" (
    "id" SERIAL NOT NULL,
    "sessionIdx" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sticky" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "username" TEXT,
    "content" TEXT,
    "sessionIdx" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sticky_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatBoxMessage" (
    "id" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "username" TEXT,
    "content" TEXT,
    "sessionIdx" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatBoxMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarcFileProgress" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "offset" BIGINT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "WarcFileProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpHeaderEntry" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL DEFAULT '',
    "status" INTEGER NOT NULL,
    "datetime" TIMESTAMP(3),
    "pragma" TEXT,
    "server" TEXT,
    "setCookie" TEXT,
    "contentType" TEXT,
    "lastModified" TIMESTAMP(3),
    "contentSecurityPolicy" TEXT,
    "eTag" TEXT,
    "location" TEXT,
    "warcType" TEXT,
    "warcRecordID" TEXT,
    "warcWarcinfoID" TEXT,
    "warcConcurrentTo" TEXT,
    "warcTargetURI" TEXT NOT NULL,
    "warcDate" TIMESTAMP(3),
    "warcIpAddress" TEXT,
    "warcOffset" BIGINT NOT NULL,
    "httpOffset" BIGINT NOT NULL,

    CONSTRAINT "HttpHeaderEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WarcFileProgress_fileName_key" ON "WarcFileProgress"("fileName");
