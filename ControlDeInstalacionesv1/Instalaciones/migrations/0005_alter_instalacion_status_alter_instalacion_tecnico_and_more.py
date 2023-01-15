# Generated by Django 4.1.3 on 2023-01-15 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Instalaciones', '0004_alter_instalacion_status_alter_instalacion_tecnico_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instalacion',
            name='status',
            field=models.IntegerField(blank=True, choices=[(0, 'Pendiente'), (1, 'Asignada'), (2, 'Completada')], default=0, null=True, verbose_name='Estado de la instlación'),
        ),
        migrations.AlterField(
            model_name='instalacion',
            name='tecnico',
            field=models.IntegerField(blank=True, choices=[(0, 'Henry'), (1, 'Johan'), (2, 'Jesús'), (3, 'Maikel'), (4, 'Yenkis')], null=True, verbose_name='Técnico asignado'),
        ),
        migrations.AlterField(
            model_name='instalacion',
            name='turno_hora',
            field=models.IntegerField(blank=True, choices=[(0, '8:30'), (1, '10:30'), (2, '12:30'), (3, '14:30'), (4, '16:30')], null=True, verbose_name='Hora de la instalación'),
        ),
    ]
