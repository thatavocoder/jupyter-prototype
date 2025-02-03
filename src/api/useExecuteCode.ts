import { useMutation } from "@tanstack/react-query";

const JUPYTER_URL = import.meta.env.VITE_JUPYTER_URL;
const TOKEN = import.meta.env.VITE_USER_TOKEN;
const USERNAME = import.meta.env.VITE_USERNAME;

export const useExecuteCode = (
  kernelId: string,
  updateCellOutput: (cellId: number, output: string) => void,
) => {
  const socket = new WebSocket(
    `ws://localhost:8000/user/admin/api/kernels/${kernelId}/channels`,
  );

  const executeCode = (cellId: number, code: string) => {
    const executeMessage = {
      header: {
        msg_id: `execute-${Date.now()}`,
        msg_type: "execute_request",
        version: "5.3",
      },
      parent_header: {},
      metadata: {},
      content: {
        code: code,
        silent: false,
        store_history: true,
        allow_stdin: true,
      },
    };

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(executeMessage));
    } else {
      socket.onopen = () => {
        socket.send(JSON.stringify(executeMessage));
      };
    }
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.msg_type === "stream" && message.content.name === "stdout") {
      const output = message.content.text;
      const parentId = message.parent_header.msg_id.split("-")[1]; // Extract the cellId from the msg_id
      updateCellOutput(parseInt(parentId), output);
    }
  };

  socket.onerror = (error) => {
    console.log("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Socket closed");
  };

  return { executeCode };
};
