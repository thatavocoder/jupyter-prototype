import { useQuery } from "@tanstack/react-query";

const JUPYTER_URL = import.meta.env.VITE_JUPYTER_URL;
const TOKEN = import.meta.env.VITE_USER_TOKEN;
const USERNAME = import.meta.env.VITE_USERNAME;

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
