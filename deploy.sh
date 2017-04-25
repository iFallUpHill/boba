#! /bin/bash
git remote add dokku dokku@$server_ip:buildwithboba
git push dokku master:master