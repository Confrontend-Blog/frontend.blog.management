#!/bin/bash

for file in ./openapi/specs/*.json; do
  filename=$(basename -- "$file")
  filename="${filename%.*}"
  node ./node_modules/@openapitools/openapi-generator-cli/main.js generate -i "$file" -g typescript-axios -o ./src/api/openapi/generated-clients/$filename --type-mappings=typescript-functional
done
