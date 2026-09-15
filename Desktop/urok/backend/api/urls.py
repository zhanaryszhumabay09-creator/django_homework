from django.urls import path
from .views import users_list, create_note

urlpatterns = [
    path("users/", users_list),
    path("notes/", create_note),
]