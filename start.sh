#!/bin/sh
set -eo pipefail
echo 'Starting up ...'
if [[ -f /tmp/env_var.sh ]]; then
    echo 'Secret available, sourcing ...'

	source /tmp/env_var.sh
	npm run start
	echo 'Started'
fi
