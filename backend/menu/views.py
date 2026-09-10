from rest_framework.decorators import api_view
from rest_framework.response import Response

from db import pizzas_collection


@api_view(["GET"])
def get_pizzas(request):
    pizzas = list(pizzas_collection.find({}, {"_id": 0}))
    return Response(pizzas)