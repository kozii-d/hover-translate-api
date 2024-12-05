import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: [
      `chrome-extension://${process.env.CHROME_EXTENSION_ID}`,
      "https://www.youtube.com",
    ],
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Origin", "Accept"],
    optionsSuccessStatus: 200,
  });

  const PORT = process.env.APPLICATION_PORT ?? 3000;
  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on Port ${PORT}`);
  });
}
bootstrap();
