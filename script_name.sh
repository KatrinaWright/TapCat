#!/bin/bash

# Check if the required tap-cat folder exists in the same directory as the script
if [ -d "tap-cat" ]; then
  # Set the input and output files
  input_file="$PWD/tap-cat/src/Cat Maps/CatSayingHello.txt"
  output_file="$PWD/tap-cat/src/Cat Maps/CatSayingHellomapDataA.json"

  # Create an empty array to store the JSON objects
  json_array=()

  # Extract the relevant data from the input file
  while IFS= read -r line
  do
    if [[ $line == *"alt="* ]]; then
      title=$(cut -d'"' -f4 <<< "$line")
    elif [[ $line == *"href="* ]]; then
      rating=$(cut -d'"' -f4 <<< "$line")
    elif [[ $line == *"coords="* ]]; then
      coords=$(cut -d'"' -f4 <<< "$line")
      shape=$(cut -d'"' -f6 <<< "$line")
      json_object="{\"title\": \"$title\", \"rating\": $rating, \"coords\": \"$coords\", \"shape\": \"$shape\"}"
      json_array+=("$json_object")
    fi
  done < "$input_file"

  # Create the JSON file with the data 
  printf "{\"data\": [%s]}" "$(printf '%s,\n' "${json_array[@]}")" | sed 's/,\n$/\n/g' > "$output_file"
  echo "JSON file created successfully at: $output_file"
else
  echo "Error: tap-cat folder not found. Please make sure the script is placed at the correct location."
fi