import multer from "multer"
import path from "node:path";
import { Request } from "express";

function getUploadDestination(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, "uploads/");
}

function getUploadFilename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${ext}`);
}

const storage = multer.diskStorage({
    destination: getUploadDestination,
    filename: getUploadFilename
});

function fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("You can only use Image files"))
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})