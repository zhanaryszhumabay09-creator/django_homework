from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=150)
    genre = models.CharField(max_length=50)
    year = models.IntegerField()
    rating = models.FloatField()
    description = models.TextField()
    poster = models.URLField()

    def __str__(self):
        return self.title