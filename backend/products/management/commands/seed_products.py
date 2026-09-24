# AI-GENERATED: Qoder
"""Заполняет базу демонстрационными категориями и товарами (цены в тенге)."""

from decimal import Decimal

from django.core.management.base import BaseCommand

from products.models import Category, Product

CATEGORIES = ["Смартфоны", "Ноутбуки", "Наушники", "Аксессуары", "Телевизоры"]

PRODUCTS = [
    ("Смартфоны", "iPhone 15 Pro", "Флагман Apple с чипом A17 Pro и титановым корпусом.", "1099990", "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800"),
    ("Смартфоны", "Samsung Galaxy S24", "Яркий AMOLED-экран и мощная камера.", "849990", "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800"),
    ("Смартфоны", "Xiaomi Redmi Note 13", "Надёжный смартфон по доступной цене.", "159990", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"),
    ("Ноутбуки", "MacBook Air M3", "Тонкий и лёгкий ноутбук для работы и учёбы.", "1299990", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"),
    ("Ноутбуки", "ASUS VivoBook 15", "Универсальный ноутбук для повседневных задач.", "429990", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"),
    ("Наушники", "AirPods Pro 2", "Беспроводные наушники с активным шумоподавлением.", "189990", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800"),
    ("Наушники", "Sony WH-1000XM5", "Полноразмерные наушники с отличным звуком.", "259990", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"),
    ("Аксессуары", "Умные часы Watch GT 4", "Стильные часы с мониторингом здоровья.", "119990", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"),
    ("Аксессуары", "Портативная колонка JBL", "Мощный звук в компактном корпусе.", "59990", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800"),
    ("Телевизоры", "Телевизор LG OLED 55", "OLED-экран с идеальной цветопередачей.", "799990", "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800"),
    ("Телевизоры", "Телевизор Samsung 43", "Качественный Smart TV для дома.", "329990", "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800"),
]


class Command(BaseCommand):
    help = "Создаёт демо-категории и товары ZhoraStore"

    def handle(self, *args, **options):
        for name in CATEGORIES:
            Category.objects.get_or_create(name=name)
        self.stdout.write(f"Категорий: {Category.objects.count()}")

        created = 0
        for cat_name, name, description, price, image in PRODUCTS:
            category = Category.objects.get(name=cat_name)
            _, is_new = Product.objects.get_or_create(
                name=name,
                defaults={
                    "description": description,
                    "category": category,
                    "price": Decimal(price),
                    "image": image,
                    "is_available": True,
                },
            )
            created += int(is_new)

        self.stdout.write(
            self.style.SUCCESS(f"Товаров создано: {created}, всего: {Product.objects.count()}")
        )
