INSTALLED_APPS = [
    'livereload',
    'django.contrib.staticfiles',
    'revproxy',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


TIME_ZONE = 'Europe/Amsterdam'
USE_TZ = True

HOST = "localhost:8000"
