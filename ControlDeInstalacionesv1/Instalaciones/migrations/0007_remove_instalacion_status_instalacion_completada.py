# Generated by Django 4.1.3 on 2023-01-15 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Instalaciones', '0006_instalacion_dia_asignado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instalacion',
            name='status',
        ),
        migrations.AddField(
            model_name='instalacion',
            name='completada',
            field=models.BooleanField(default=False, verbose_name='Instalacion Completada'),
        ),
    ]
