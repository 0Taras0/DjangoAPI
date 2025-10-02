# Simple RestAPI

```
py --version
py -m venv .venv
```

# Activate venv
```
.venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip
py -m pip install Django

python -m django --version

django-admin startproject atbapi

cd atbapi

py manage.py runserver 4099
```

## Install Postgress
```
pip install psycopg2-binary

py manage.py migrate
```

# Migrations
```
cd atbapi

py manage.py makemigrations users

python manage.py migrate
```

## Install requirements
```
pip freeze

pip freeze > requirements.txt

pip install -r requirements.txt
```

## Add super user
```
py manage.py createsuperuser
admin
admin@gmail.com
123456
py manage.py runserver 4099
```