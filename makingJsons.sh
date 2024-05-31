#!/bin/bash

# Input and output file paths
INPUT_FILE="tap-cat/src/Cat Maps/CatSayingHello.txt"
OUTPUT_FILE="tap-cat/src/Cat Maps/CatSayingHellomapDataAI.json"

# Create the output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Initialize the JSON array
echo "[" > "$OUTPUT_FILE"

# Read the input file and extract the necessary data
while IFS= read -r line; do
    if [[ $line == *"<area"* ]]; then
        title=$(echo $line | grep -oP 'title="\K[^"]+')
        rating=$(echo $line | grep -oP 'href="\K[^"]+')
        coords=$(echo $line | grep -oP 'coords="\K[^"]+')
        shape=$(echo $line | grep -oP 'shape="\K[^"]+')

        # Create a JSON object for each area
        cat <<EOL >> "$OUTPUT_FILE"
    {
        "title": "$title",
        "rating": $rating,
        "coords": "$coords",
        "shape": "$shape"
    },
EOL
    fi
done < "$INPUT_FILE"

# Remove the last comma and close the JSON array
sed -i '$ s/,$//' "$OUTPUT_FILE"
echo "]" >> "$OUTPUT_FILE"

echo "JSON data has been written to $OUTPUT_FILE"