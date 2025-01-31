import { useQuery } from "@tanstack/react-query";

const JUPYTER_URL = import.meta.env.VITE_JUPYTER_URL;
const TOKEN = import.meta.env.VITE_USER_TOKEN;
const USERNAME = import.meta.env.VITE_USERNAME;

export const useStartServer = () => {
  const { isLoading, error } = useQuery({
    queryKey: ["server"],
    queryFn: async () => {
      const response = await fetch(
        `${JUPYTER_URL}/hub/api/users/${USERNAME}/server`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to start server");
      }
    },
  });

  return { isLoading, error };
};

export const useStartKernel = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["kernel"],
    queryFn: async () => {
      const response = await fetch(
        `${JUPYTER_URL}/user/${USERNAME}/api/kernels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${TOKEN}`,
          },
          body: JSON.stringify({ name: "python3" }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to start kernel");
      }

      const data = await response.json();

      return data;
    },
  });

  return { data, isLoading, error };
};

export const executeCode = (kernelId: string) => {
  const socket = new WebSocket(
    `${JUPYTER_URL}/user/${USERNAME}/api/kernels/${kernelId}/channels`,
  );

  socket.onopen = () => {
    console.log("WebSocket connected to Jupyter kernel.");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};
