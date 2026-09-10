from django.urls import path
from .views import get_pizzas

urlpatterns = [
    path("pizzas/", get_pizzas),
]