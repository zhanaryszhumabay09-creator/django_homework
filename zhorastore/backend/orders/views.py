# AI-GENERATED: Qoder
from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.models import Cart
from cart.views import get_or_create_cart

from .models import Order, OrderItem
from .serializers import CheckoutSerializer, OrderSerializer


class CheckoutView(APIView):
    """POST /api/orders/checkout/ — оформить заказ из корзины."""

    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart = get_or_create_cart(request.user)
        items = list(cart.items.select_related("product").all())
        if not items:
            return Response(
                {"detail": "Корзина пуста."}, status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(user=request.user, total=cart.total, **serializer.validated_data)

        for item in items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                price=item.product.price,
                quantity=item.quantity,
            )

        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    """GET /api/orders/ — история заказов текущего пользователя."""

    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items")


class OrderDetailView(generics.RetrieveAPIView):
    """GET /api/orders/<id>/ — детали заказа текущего пользователя."""

    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items")
