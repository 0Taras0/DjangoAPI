from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from . import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('topics.urls')),
    path('api/', include('posts.urls')),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

urlpatterns += static(settings.AVATARS_URL, document_root=settings.AVATARS_ROOT)
urlpatterns += static(settings.IMAGES_URL, document_root=settings.IMAGES_ROOT)
urlpatterns += static(settings.VIDEOS_URL, document_root=settings.VIDEOS_ROOT)