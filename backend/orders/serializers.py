# AI-GENERATED: Qoder
from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "price", "quantity", "subtotal"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "status_display",
            "full_name",
            "email",
            "phone",
            "address",
            "comment",
            "total",
            "created_at",
            "items",
        ]
        read_only_fields = ["id", "status", "total", "created_at", "items"]


class CheckoutSerializer(serializers.Serializer):
    """Данные для оформления заказа из корзины."""

    full_name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=40)
    address = serializers.CharField(max_length=300)
    comment = serializers.CharField(required=False, allow_blank=True)
