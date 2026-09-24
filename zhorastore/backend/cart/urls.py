# AI-GENERATED: Qoder
from django.urls import path

from .views import AddCartItemView, CartItemDetailView, CartView

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart"),
    path("cart/items/", AddCartItemView.as_view(), name="cart-add"),
    path("cart/items/<int:pk>/", CartItemDetailView.as_view(), name="cart-item-detail"),
]
