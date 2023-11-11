import axios from "axios";
import { useContext, useEffect } from "react";

// FIXME
import { baseUrl } from "../../api/facades/api-facade";
import MicroFrontend from "../../components/micro-fe/micro-frontend";
import AuthContext from "../../providers/auth-context";
import logger from "../../utils/error-handling/logger";

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
        logger.info(data);
      })
      .catch(logger.error);
  }, []);
  return <MicroFrontend containerId="chat-microfrontend-container" />;
}

Messages.displayName = "Messages";

export default Messages;
