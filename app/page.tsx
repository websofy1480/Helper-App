import About from "./components/About";
import AdminBlogPage from "./components/BlogForm";
import ChatBot from "./components/ChatBot";
import UploadPage from "./components/Image";
import ImagesPage from "./components/ImagesPage";
import ImageUploader from "./components/ImageUploader";
import { CreateKeyword } from "./components/KeywordInput";
import OAuth from "./components/OAuth";
import SpeechToText from "./components/SpeechToText";
import TopBar from "./components/TopBar";
import WebRtc from "./components/Webrtc";


export default function Home() {
  return (
    <>
      {/* <ImagesPage/> */}
      {/* <UploadPage/> */}
      {/* <AdminBlogPage/> */}
      {/* <CreateKeyword /> */}
      {/* <ImageUploader/> */}
      <TopBar/>
       <About/>
      {/* <SpeechToText/> */}
      {/* <WebRtc/> */}
      {/* <OAuth/> */}
      {/* <ChatBot/>/ */}
    </>
  );
}
