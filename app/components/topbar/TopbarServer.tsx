import { connectDB } from "@/lib/connectdb";
import TopbarClient from "./TopbarClient";
import Blog from "@/models/Blog";


const TopbarServer = async () => {
  const data = await getTopbarData(); // ✅ direct DB call

  return <TopbarClient data={data} />;
};

export default TopbarServer;


export const getTopbarData = async () => {
  await connectDB();
  const data = await Blog.find().lean();
  return JSON.parse(JSON.stringify(data));
};