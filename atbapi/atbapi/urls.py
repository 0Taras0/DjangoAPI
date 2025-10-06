from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from . import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),

    # Генерація OpenAPI схем
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # Swagger UI
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # ReDoc
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

urlpatterns += static(settings.AVATARS_URL, document_root=settings.AVATARS_ROOT)