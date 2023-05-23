###################
# BUILD
###################

FROM node:hydrogen-slim As build

WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Run the build command which creates the production bundle
RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --omit=dev && npm cache clean --force

USER node

###################
# EXTRACTION
###################

FROM node:hydrogen-slim As production

# ARGUMENTS & ENVIRONMENTS
ARG TZ=UTC
ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE
ARG JWT_SECRET
ARG JWT_EXPIRATION_TIME

ENV TZ ${TZ}
ENV DB_HOST ${DB_HOST}
ENV DB_PORT ${DB_PORT}
ENV DB_USERNAME ${DB_USERNAME}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_DATABASE ${DB_DATABASE}
ENV JWT_SECRET ${JWT_SECRET}
ENV JWT_EXPIRATION_TIME ${JWT_EXPIRATION_TIME}

RUN npm install pm2 -g

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000

# Start the server using the production build
CMD ["pm2-runtime", "dist/main.js"]