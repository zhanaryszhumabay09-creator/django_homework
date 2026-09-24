# AI-GENERATED: Qoder
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Категория товара."""

    name = models.CharField("Название", max_length=120, unique=True)
    slug = models.SlugField("Слаг", max_length=140, unique=True, blank=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Товар магазина. Цена хранится в тенге."""

    name = models.CharField("Название", max_length=200)
    slug = models.SlugField("Слаг", max_length=220, unique=True, blank=True)
    description = models.TextField("Описание", blank=True)
    category = models.ForeignKey(
        Category,
        verbose_name="Категория",
        related_name="products",
        on_delete=models.CASCADE,
    )
    price = models.DecimalField("Цена (₸)", max_digits=12, decimal_places=2)
    image = models.URLField("Ссылка на изображение", max_length=500, blank=True)
    is_available = models.BooleanField("В наличии", default=True)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name, allow_unicode=True) or "product"
            slug = base
            counter = 1
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                counter += 1
                slug = f"{base}-{counter}"
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
