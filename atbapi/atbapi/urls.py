from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

from . import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
]

urlpatterns += static(settings.AVATARS_URL, document_root=settings.AVATARS_ROOT)