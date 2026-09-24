# AI-GENERATED: Qoder
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product

from .models import Cart, CartItem
from .serializers import AddCartItemSerializer, CartSerializer


def get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


class CartView(APIView):
    """GET /api/cart/ — корзина текущего пользователя."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = get_or_create_cart(request.user)
        return Response(CartSerializer(cart).data)


class AddCartItemView(APIView):
    """POST /api/cart/items/ — добавить товар (или увеличить количество)."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart = get_or_create_cart(request.user)
        product = Product.objects.get(pk=serializer.validated_data["product_id"])
        quantity = serializer.validated_data["quantity"]

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            item.quantity += quantity
            item.save()

        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class CartItemDetailView(APIView):
    """PATCH/DELETE /api/cart/items/<id>/ — изменить количество или удалить."""

    permission_classes = [permissions.IsAuthenticated]

    def get_item(self, request, pk):
        cart = get_or_create_cart(request.user)
        return CartItem.objects.filter(cart=cart, pk=pk).first()

    def patch(self, request, pk):
        item = self.get_item(request, pk)
        if not item:
            return Response({"detail": "Позиция не найдена."}, status=status.HTTP_404_NOT_FOUND)

        quantity = request.data.get("quantity")
        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            return Response({"detail": "Некорректное количество."}, status=status.HTTP_400_BAD_REQUEST)

        if quantity <= 0:
            item.delete()
        else:
            item.quantity = quantity
            item.save()

        return Response(CartSerializer(item.cart).data)

    def delete(self, request, pk):
        item = self.get_item(request, pk)
        if not item:
            return Response({"detail": "Позиция не найдена."}, status=status.HTTP_404_NOT_FOUND)
        cart = item.cart
        item.delete()
        return Response(CartSerializer(cart).data)
