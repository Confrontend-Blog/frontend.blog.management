import React from "react";

import MicroFrontend from "../../components/micro-fe/micro-frontend";

const MicroFe = import.meta.env.VITE_MFE_CHAT;

function Messages() {
  return (
    <MicroFrontend
      containerId="chat-microfrontend-container"
      windowObjectName={MicroFe}
    />
  );
}

Messages.displayName = "Messages";

export default Messages;
