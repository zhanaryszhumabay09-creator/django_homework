# AI-GENERATED: Qoder
import django_filters
from rest_framework import generics

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class ProductFilter(django_filters.FilterSet):
    """Фильтры каталога: категория, диапазон цен, наличие."""

    category = django_filters.CharFilter(field_name="category__slug")
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    is_available = django_filters.BooleanFilter(field_name="is_available")

    class Meta:
        model = Product
        fields = ["category", "min_price", "max_price", "is_available"]


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["price", "created_at", "name"]
    ordering = ["-created_at"]


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
