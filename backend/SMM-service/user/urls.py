from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import register_user, authenticate_user

# schema_view = get_schema_view(
#    openapi.Info(
#       title="Your API Title",
#       default_version='v1',
#       license=openapi.License(name="BSD License"),
#    ),
#    public=True,
#    permission_classes=(permissions.AllowAny,),
# )

urlpatterns = [
   path('auth/register/', register_user, name='register_user'),
   path('auth/login/', authenticate_user, name='authenticate_user'),
   # path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   # path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
