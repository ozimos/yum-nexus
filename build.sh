#!/bin/sh
set -eux pipefail

echo 'Starting up ...'

if [ -f /run/secrets/envvars ]; then
    echo 'Secret available, sourcing ...'
   source /run/secrets/envvars
    npm run generate
    npm run build
fi
echo 'Build completed'
