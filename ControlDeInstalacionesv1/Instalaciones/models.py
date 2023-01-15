from django.db import models
TECNICOS = (
    (0, 'Henry'),
    (1, 'Johan'),
    (2, 'Jesús'),
    (3, 'Maikel'),
    (4, 'Yenkis')
)

HORAS = (
    (0, '8:30'),
    (1, '10:30'),
    (2, '12:30'),
    (3, '14:30'),
    (4, '16:30')
)

# Create your models here.
class Instalacion(models.Model):
    nro_contrato = models.CharField(max_length=8, verbose_name="Nro. de Contrato", primary_key=True)
    nombre_cliente = models.CharField(max_length=100, verbose_name="Nombre del Cliente")
    direccion = models.TextField(max_length=200, verbose_name="Dirección")
    nro_telefono = models.CharField(max_length=13, verbose_name="Nro. de Teléfono")

    tecnico = models.IntegerField(verbose_name="Técnico asignado", choices=TECNICOS, blank=True, null=True)
    turno_hora = models.IntegerField(verbose_name="Hora de la instalación", choices=HORAS, blank=True, null=True)

    dia_asignado = models.DateField(verbose_name="Día asignado", blank=True, null=True)

    completada = models.BooleanField(verbose_name="Instalacion Completada", default=False)

    def __str__(self):
        return self.nro_contrato
    