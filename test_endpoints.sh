#!/bin/bash

# Example shell script to run all curl commands in the JSON test file

# Loop through all the requests in the test_requests.json file
requests=$(cat ./test/test_requests.json | jq -c '.requests[]')

# Iterate over each request
for req in $requests; do
    method=$(echo $req | jq -r '.method')
    url=$(echo $req | jq -r '.url')
    body=$(echo $req | jq -r '.body')
    headers=$(echo $req | jq -r '.headers | to_entries | map("\(.key): \(.value)") | .[:]')
    description=$(echo $req | jq -r '.description')

    echo "Running: $description"
    
    # Execute the curl command based on the HTTP method
    if [ "$method" == "POST" ] || [ "$method" == "PUT" ]; then
        curl -X $method $url -H "$headers" -d "$body"
    else
        curl -X $method $url -H "$headers"
    fi
done
