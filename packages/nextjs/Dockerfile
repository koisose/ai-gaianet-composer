# docker/dev.Dockerfile
FROM node:22-alpine

WORKDIR /app/next-app

COPY package.json ./

RUN npm install --force

COPY . .
ENV NEYNAR=""
ENV QUIRREL_TOKEN=""
ENV QUIRREL_BASE_URL=""
ENV QUIRREL_ENCRYPTION_SECRET=""
ENV QUIRREL_API_URL=""
ENV MONGO=""
ENV BROWSERLESS=""
ENV MINIO_ENDPOINT=""
ENV MINIO_ACCESS_KEY=""
ENV MINIO_SECRET_KEY=""
ENV MINIO_URL=""
ENV SIGNER=""
ENV FID=""
ENV GROQ_API_KEY=""
# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# for deploting the build version
EXPOSE 3000
RUN npm run build
# and
CMD npm run start

# OR for sart Next.js in development, comment above two lines and uncomment below line

# CMD bun run dev