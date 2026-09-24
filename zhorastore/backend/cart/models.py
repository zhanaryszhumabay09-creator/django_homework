# AI-GENERATED: Qoder
from django.contrib.auth.models import User
from django.db import models

from products.models import Product


class Cart(models.Model):
    """Корзина пользователя."""

    user = models.OneToOneField(
        User, verbose_name="Пользователь", related_name="cart", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField("Создана", auto_now_add=True)

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

    @property
    def total(self):
        return sum((item.subtotal for item in self.items.all()), 0)

    @property
    def items_count(self):
        return sum((item.quantity for item in self.items.all()), 0)

    def __str__(self):
        return f"Корзина: {self.user.username}"


class CartItem(models.Model):
    """Позиция корзины."""

    cart = models.ForeignKey(
        Cart, verbose_name="Корзина", related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, verbose_name="Товар", related_name="cart_items", on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField("Количество", default=1)

    class Meta:
        verbose_name = "Позиция корзины"
        verbose_name_plural = "Позиции корзины"
        unique_together = ("cart", "product")

    @property
    def subtotal(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.product.name} x{self.quantity}"
