#!/bin/bash

# Check if the required tap-cat folder exists in the same directory as the script
if [ -d "tap-cat" ]; then
  # Set the input and output files
  input_file="$PWD/tap-cat/src/Cat Maps/CatSayingHello.txt"
  output_file="$PWD/tap-cat/src/Cat Maps/CatSayingHellomapDataA.json"

  # Create an empty array to store the JSON objects
  mkdir -p "$(dirname "$output_file")"
  echo "[" > "$output_file"

  # Extract the relevant data from the input file
  while IFS= read -r line; do
    if [[ $line == *"<area"* ]]; then
        title=$(echo $line | grep -oP 'title="\K[^"]+')
        rating=$(echo $line | grep -oP 'href="\K[^"]+')
        coords=$(echo $line | grep -oP 'coords="\K[^"]+')
        shape=$(echo $line | grep -oP 'shape="\K[^"]+')

        # Create a JSON object for each area
        cat <<EOL >> "$output_file"
    {
        "title": "$title",
        "rating": $rating,
        "coords": "$coords",
        "shape": "$shape"
    },
EOL
    fi
  done < "$input_file"

  # Create the JSON file with the data 
sed -i '$ s/,$//' "$output_file"
echo "]" >> "$output_file"
  echo "JSON file created successfully at: $output_file"
else
  echo "Error: tap-cat folder not found. Please make sure the script is placed at the correct location."
fi