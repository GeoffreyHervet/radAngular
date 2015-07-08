#!/bin/sh

exit 0
dir=dist
file="${dir}/cache.manifest"

echo 'CACHE MANIFEST' 	>  $file
echo '' 		>> $file
echo '# '`date` 	>> $file
echo '' 		>> $file
echo 'CACHE:' 		>> $file
find $dir -type f | sed 's/'"$dir"'\///g' | sed 's/cache.manifest/ /g' | grep -v htaccess | grep -v ignore | grep -v DS_Store| grep -v " "  >> $file

dir=app
file="${dir}/cache.manifest"
rm -f $file
#echo 'CACHE MANIFEST' 	>  $file
#echo '' 		>> $file
#echo '# '`date` 	>> $file
#echo '' 		>> $file
#echo 'CACHE:' 		>> $file
#find $dir -type f | sed 's/'"$dir"'\///g' | sed 's/cache.manifest/ /g' | grep -v htaccess | grep -v ignore | grep -v DS_Store| grep -v " "  >> $file
