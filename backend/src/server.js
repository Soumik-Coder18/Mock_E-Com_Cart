import net from "node:net";
import app from "./app.js";

const DEFAULT_PORT = 5001;
const MAX_PORT_ATTEMPTS = 20;

const parsedPort = Number(process.env.PORT);
const requestedPort = Number.isFinite(parsedPort) ? parsedPort : DEFAULT_PORT;

const isPortAvailable = (port) => {
  if (port === 0) {
    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    const tester = net.createServer();

    const cleanup = () => {
      tester.removeAllListeners("error");
      tester.removeAllListeners("listening");
    };

    tester.once("error", (error) => {
      cleanup();

      if (error.code === "EADDRINUSE") {
        resolve(false);
        return;
      }

      reject(error);
    });

    tester.once("listening", () => {
      cleanup();
      tester.close(() => resolve(true));
    });

    tester.listen(port, "0.0.0.0");
  });
};

const findAvailablePort = async (startPort, attempts = MAX_PORT_ATTEMPTS) => {
  for (let candidate = startPort; candidate < startPort + attempts; candidate += 1) {
    // Guard against invalid port numbers if the loop runs beyond 65535.
    if (candidate < 0 || candidate > 65535) {
      break;
    }

    const available = await isPortAvailable(candidate);

    if (available) {
      return candidate;
    }
  }

  throw new Error(
    `No available ports found in the range ${startPort}-${startPort + attempts - 1}.`
  );
};

const startServer = async () => {
  try {
    const port = await findAvailablePort(requestedPort);

    if (port !== requestedPort) {
      console.warn(
        `⚠️ Port ${requestedPort} is in use. Starting server on available port ${port} instead.`
      );
      console.warn("ℹ️ Update the PORT environment variable if you need a fixed port.");
    }

    const server = app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`);
    });

    server.on("error", (error) => {
      console.error("❌ Server failed to start:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Unable to start the server:", error);
    process.exit(1);
  }
};

startServer();