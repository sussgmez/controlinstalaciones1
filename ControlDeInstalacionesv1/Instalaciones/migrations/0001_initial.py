# Generated by Django 4.1.3 on 2023-01-15 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Instalacion',
            fields=[
                ('nro_contrato', models.CharField(max_length=8, primary_key=True, serialize=False, verbose_name='Nro. de Contrato')),
                ('nombre_cliente', models.CharField(max_length=100, verbose_name='Nombre del Cliente')),
                ('direccion', models.TextField(max_length=200, verbose_name='Dirección')),
                ('nro_telefono', models.CharField(max_length=13, verbose_name='Nro. de Teléfono')),
                ('tecnico', models.CharField(choices=[(0, 'Henry'), (1, 'Johan'), (2, 'Jesús'), (3, 'Maikel'), (4, 'Yenkis')], max_length=7, verbose_name='Técnico asignado')),
                ('turno_hora', models.CharField(choices=[(0, '8:30'), (1, '10:30'), (2, '12:30'), (3, '14:30'), (4, '16:30')], max_length=6, verbose_name='Hora de la instalación')),
            ],
        ),
    ]
