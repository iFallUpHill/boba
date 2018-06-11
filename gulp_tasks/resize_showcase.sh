#!/bin/bash
currentDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
screenshotSource="$currentDIR/../src/screenshots"

for f in "$screenshotSource"/*.png ; do
    filename=${f##*/}
    fileNoExt=${filename%.png}

    if [ ! -f "$screenshotSource"/"$fileNoExt".jpg ]; then
        echo "Converting ${filename} ==> ${fileNoExt}.jpg"
        convert -resize 800x500 "$f" "${f}"
        mogrify -format jpg "$f"
    else
        echo "Skipping ${filename}"
    fi
done
