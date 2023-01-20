python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install -r server/requirements.txt 
cd server/

./manage.py migrate

# supply username, email and password for the first user
./manage.py createsuperuser
./manage.py runserver

# Can validate with a curl post using the super user username and password from above
```
curl --location --request POST 'http://localhost:8000/login/' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'username=testuser' \
  --data-urlencode 'password=test123@@!!'
```

If the server is set up succesfully running a curl test in another shell will validate it:

``` 
$ curl --location --request POST 'http://localhost:8000/login/' \
>   --header 'Content-Type: application/x-www-form-urlencoded' \
>   --data-urlencode 'username=testuser' \
>   --data-urlencode 'password=test123@@!!'
ok <token or jwt here> 

$ curl --location --request POST 'http://localhost:8000/login/'   --header 'Content-Type: application/x-w--data-urlencode 'username=testuser'   --data-urlencode 'password=invalid'
invalid credentials 

```