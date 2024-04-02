from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# Создаем SchemaView для всех наших URL-адресов API
schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version='v1',
        description="API",
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("api/", include("ai.urls")),
    path("api/", include("channel.urls")),
    path("api/", include("core.urls")),
    path("api/", include("post.urls")),
    path("api/", include("telegram.urls")),
    path("api/", include("user.urls")),
    path("api/", include("workspace.urls")),
    # path("api/", include("analytics.urls")),

    path("swagger/", schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("redoc/", schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
