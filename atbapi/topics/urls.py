from rest_framework.routers import DefaultRouter
from .views import TopicsViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'topics', TopicsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]