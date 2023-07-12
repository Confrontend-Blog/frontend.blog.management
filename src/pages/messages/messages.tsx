import { useEffect } from "react";

declare global {
  interface Window {
    chatMicroFrontend?: {
      mount: (containerId: string) => void;
      unmount: (containerId: string) => void;
    };
  }
}

function Messages() {
  // TODO create better container
  const containerId = "root";

  useEffect(() => {
    // Mount the microfrontend when the component is rendered
    window.chatMicroFrontend?.mount(containerId);

    // Unmount the microfrontend when the component is unmounted
    return () => window.chatMicroFrontend?.unmount(containerId);
  }, []);

  return <div id={containerId} />;
}

export default Messages;
