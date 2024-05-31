#!/bin/bash

# Check if the required tap-cat folder exists in the same directory as the script
tap_cat_dir="./tap-cat"
if [ ! -d "$tap_cat_dir" ]; then
  echo "Error: tap-cat folder not found. Please make sure the script is placed at the correct location."
  exit 1
fi

# Function to parse the input file and generate JSON
parse_file_to_json() {
  input_file="$1"

  # Extract data from the input file
  data=$(while IFS= read -r line; do
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
done < "$INPUT_FILE")

  # Wrap the extracted data with square brackets to form a valid JSON array
  printf "[$data]\n"
}

# Main function to process the input text file and generate the JSON file
main() {
  input_file="Cat Saying Hello.txt"  # Replace this with the actual filename

  # Check if the input file exists
  if [ ! -f "$input_file" ]; then
    echo "Error: Input file not found. Please place the input file in the same directory as the script."
    exit 1
  fi  
  
  # Create the Cat Maps folder if it doesn't exist
  map_dir="$tap_cat_dir/src/Cat Maps"
  mkdir -p "$map_dir"

  # Generate the JSON file
  json_file="$map_dir/CatSayingHellomapDataB.json"
  parse_file_to_json "$input_file" > "$json_file"
  echo "JSON data successfully written to: $json_file"  
}

# Execute the main function
main