#!/bin/sh
set -eo pipefail
echo 'Starting up ...'
if [[ -f /tmp/env_var.sh ]]; then
    echo 'Secret available, sourcing ...'

	source /tmp/env_var.sh
	npm run generate
    npm run build
	# cp /var/app/staging/api/public /var/app/staging/node_modules/.build/api/public
	echo 'Build completed'
fi

if [[ -f /tmp/leader_only ]]; then
    echo 'Lead container, migrating ...'

	npm run migrate
	echo 'Migration completed'
fi