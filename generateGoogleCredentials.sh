#!/bin/sh

# Check if GOOGLE_CREDENTIALS_BASE64 is set
if [ -n "$GOOGLE_CREDENTIALS_BASE64" ]; then
  echo "Decoding GOOGLE_CREDENTIALS_BASE64..."
  echo "$GOOGLE_CREDENTIALS_BASE64" | base64 -d > /app/google-credentials.json
  export GOOGLE_APPLICATION_CREDENTIALS=/app/google-credentials.json
else
  echo "GOOGLE_CREDENTIALS_BASE64 is not set. Exiting..."
  exit 1
fi

# Run the command
exec "$@"