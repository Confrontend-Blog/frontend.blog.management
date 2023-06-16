
// import { useEffect, useState } from "react";

declare global {
  interface Window {
    hasLoadedMicrofrontend: boolean;
  }
}


function Messages() {
  // const [isMicroFrontendLoaded, setIsMicroFrontendLoaded] = useState(false);

  // useEffect(() => {
  //   console.log(1);
    

  //   System.import("http://127.0.0.1:4174/main-chat-fe.js")
  //     .then(() => {
  //       setIsMicroFrontendLoaded(true);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to load microfrontend", err);
  //     });
  // }, []);

  // if (!isMicroFrontendLoaded) {
  //   return <div>Loading...</div>;
  // }

  return <div></div>;
}

export default Messages;