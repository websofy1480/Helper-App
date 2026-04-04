import mongoose from "mongoose";
import Grid from "gridfs-stream";

let gfs: any;

export const initGridFS = () => {
  const conn = mongoose.connection;
  if (!gfs) {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
  }
  return gfs;
};
