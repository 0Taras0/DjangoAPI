from .serializers import TopicSerializer
from .models import Topic
from rest_framework.viewsets import ModelViewSet

class TopicsViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer