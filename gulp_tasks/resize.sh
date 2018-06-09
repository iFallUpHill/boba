for f in ./screenshots/*.png ; do
    filename=${f##*/}
    fileNoExt=${filename%.png}

    if [ ! -f ./screenshots/"$fileNoExt".jpg ]; then
        echo "Converting ${filename} ==> ${fileNoExt}.jpg"
        convert -resize 800x500 "$f" "${f}"
        mogrify -format jpg "$f"
    else
        echo "Skipping ${filename}"
    fi
done

