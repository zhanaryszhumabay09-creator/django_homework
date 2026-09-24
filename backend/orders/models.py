# AI-GENERATED: Qoder
from django.contrib.auth.models import User
from django.db import models

from products.models import Product


class Order(models.Model):
    """Заказ покупателя."""

    class Status(models.TextChoices):
        NEW = "new", "Новый"
        PAID = "paid", "Оплачен"
        SHIPPED = "shipped", "Отправлен"
        COMPLETED = "completed", "Завершён"
        CANCELLED = "cancelled", "Отменён"

    user = models.ForeignKey(
        User, verbose_name="Пользователь", related_name="orders", on_delete=models.CASCADE
    )
    status = models.CharField(
        "Статус", max_length=20, choices=Status.choices, default=Status.NEW
    )
    full_name = models.CharField("ФИО", max_length=200)
    email = models.EmailField("Email")
    phone = models.CharField("Телефон", max_length=40)
    address = models.CharField("Адрес доставки", max_length=300)
    comment = models.TextField("Комментарий", blank=True)
    total = models.DecimalField("Итого (₸)", max_digits=14, decimal_places=2, default=0)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Заказ #{self.pk} — {self.user.username}"


class OrderItem(models.Model):
    """Позиция заказа (цена фиксируется на момент оформления)."""

    order = models.ForeignKey(
        Order, verbose_name="Заказ", related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, verbose_name="Товар", related_name="order_items", on_delete=models.SET_NULL, null=True
    )
    product_name = models.CharField("Название товара", max_length=200)
    price = models.DecimalField("Цена (₸)", max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField("Количество", default=1)

    class Meta:
        verbose_name = "Позиция заказа"
        verbose_name_plural = "Позиции заказа"

    @property
    def subtotal(self):
        return self.price * self.quantity

    def __str__(self):
        return f"{self.product_name} x{self.quantity}"
