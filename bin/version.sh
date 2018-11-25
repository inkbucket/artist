#!/bin/sh
echo "The version would be: $1"
echo "export const ARTIST_VERSION='$1'" > ./docs/environments/version.ts
echo "Version file updated!"