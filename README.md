## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [HeroUI](https://heroui.com)
- [TypeScript](https://www.typescriptlang.org)

## Running the Project

1. Clone the JupyterHub deployment:

   ```bash
   git clone https://github.com/jupyterhub/jupyterhub-deploy-docker.git
   ```

2. Add the following lines to `jupyterhub_config.py`:

   ```python
   c.Spawner.args = [
       f"--NotebookApp.allow_origin=http://localhost:5173",
   ]

   c.JupyterHub.tornado_settings = {
       "headers": {
           "Access-Control-Allow-Origin": "http://localhost:5173",
       },
       "ws_max_message_size": 104857600,
   }
   ```

3. Run the Docker Compose setup:

   ```bash
   docker compose up
   ```

4. Open your browser and navigate to `http://localhost:8000/hub/token` and click on "Request new API token". Once the token is generated, copy it and save it somewhere.

5. Clone the repository for the frontend:

   ```bash
   git clone https://github.com/thatavocoder/jupyter-prototype
   ```

6. Install the node modules using `yarn`:

   ```bash
   yarn
   ```

7. Create a `.env` file with the environment variables that are in `.env.example`, and use the token that we copied above here.

8. Start the development server:

   ```bash
   yarn run dev
   ```

9. Open your browser and navigate to `http://localhost:5173/` to use the application.
