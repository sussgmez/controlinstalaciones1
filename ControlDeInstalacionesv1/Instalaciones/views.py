from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import redirect
from .models import Instalacion
import datetime 
import csv

# Create your views here.
def agenda(request): 
    try: 
        fecha = request.GET['fecha']
    except:
        fecha = datetime.datetime.now().strftime('%Y-%m-%d')
    return render(request, 'instalaciones/agenda.html', context= {'fecha':fecha})

def to_agenda(request):
    return redirect('agenda')

def get_pendientes(request):
    instalaciones_pendientes = Instalacion.objects.filter(tecnico=None)
    return HttpResponse(serializers.serialize('json', instalaciones_pendientes))


def get_asignadas(request, fecha):
    instalaciones_pendientes = Instalacion.objects.filter(dia_asignado=fecha)
    return HttpResponse(serializers.serialize('json', instalaciones_pendientes))

def save_changes(request):
    if (request.POST):
        instalaciones = request.POST['cambios'].split(',')

        if instalaciones[0] != "":
            for aux_instalacion in instalaciones:
                instalacion = aux_instalacion.split(';')
                ins = Instalacion.objects.get(pk=instalacion[0])
                
                if instalacion[1] == "null":
                    ins.turno_hora = None
                    ins.tecnico = None
                    ins.dia_asignado = None
                    ins.save()
                else:
                    ins.turno_hora = instalacion[1].split('row-')[1]
                    ins.tecnico = instalacion[2].split('col-')[1]
                    ins.dia_asignado = request.POST['fecha']
                    ins.save()

    return redirect('/agenda/?fecha={}'.format(request.POST['fecha']))

def load_csv(request):
    path = request.POST['file_csv']

    with open(path) as File:
        reader = csv.reader(File)
        for row in reader:
            Instalacion.objects.get_or_create(pk=row[0], nombre_cliente=row[1], direccion=row[2])

    return HttpResponse()