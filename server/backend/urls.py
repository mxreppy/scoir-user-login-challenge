"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.urls import path


def login(request):
    if request.method != "POST":
        return HttpResponse('invalid method', status=405)

    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    print(f'username {username} and password {password}')
    if username and password:
        print(f'looking for "{username}"')
        user = User.objects.filter(username=username).first()
        print(user)
        if user:
            print(f'validating with {password}')
            if user.check_password(password):
                print('valid')
                return HttpResponse('ok <token or jwt here>')

        return HttpResponse('invalid credentials', status=401)
    return HttpResponse('invalid post parameters', status=400)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login),
]
