import axios from "axios";
import { useContext, useEffect } from "react";

import { baseUrl } from "../../api/api-facade";
import MicroFrontend from "../../components/micro-fe/micro-frontend";
import AuthContext from "../../providers/auth-context";

function Messages() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function getToken() {
      const res = await axios.post(`${baseUrl}/api/auth/chat-token`, {
        id: user?.id,
      });
      return res.data;
    }
    getToken()
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }, []);
  return <MicroFrontend containerId="chat-microfrontend-container" />;
}

Messages.displayName = "Messages";

export default Messages;
