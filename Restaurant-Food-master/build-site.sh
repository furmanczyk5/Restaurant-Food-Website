#!/usr/bin/env bash

WORK_DIRECTORY=$(pwd)
BUILD_DIRECTORY="out"
PAGES_DIRECTORY="pages/"
HEADER_FILE="header.html"
FOOTER_FILE="footer.html"

STATIC_INCLUDES=("style" "script" "slick" "images")

PAGES_PATH="$WORK_DIRECTORY/$PAGES_DIRECTORY"
HEADER_PATH="$WORK_DIRECTORY/$HEADER_FILE"
FOOTER_PATH="$WORK_DIRECTORY/$FOOTER_FILE"
BUILD_PATH="$WORK_DIRECTORY/$BUILD_DIRECTORY"

rm -R $BUILD_PATH
mkdir $BUILD_PATH

for file in $(ls "$PAGES_PATH"); do
    echo "Building page $file."
    cat "$HEADER_PATH" "$PAGES_PATH/$file" "$FOOTER_PATH" > "$BUILD_PATH/$file"
done

for file in ${STATIC_INCLUDES[*]}; do
    echo "Copying directory $file."
    cp -R "$WORK_DIRECTORY/$file" -T "$BUILD_PATH/$file"
done

echo "Site generated and written to $BUILD_PATH."
