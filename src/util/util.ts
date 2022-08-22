import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS modified by Ohamene Kingsley github.com/ohansck
//    inputURL: string - a publicly accessible url to an image file
//    imageQUality: number - an interger to set the desired output image quality
// RETURNS
//    an absolute path to a filtered image locally saved file
// Edited by Ohaneme Kingsley. User can set quality of filtered image.
// Default quality set at 60
export async function filterImageFromURL(inputURL: string, imageQuality: number): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(imageQuality) // set JPEG quality. Edited by github.com/ohansck
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error: any) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
