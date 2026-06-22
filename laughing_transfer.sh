#!/bin/sh
rsync -rcv --exclude .git --exclude '*~' --chmod=Dugo+x,ugo+r ./ jadedresearcher@45.79.215.125:/var/www/html/laughing.observer/public_html/
