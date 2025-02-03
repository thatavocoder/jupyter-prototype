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
