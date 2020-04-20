from django.db import models


class Users(models.Model):
    numero = models.CharField(db_column='NUMERO', max_length=384, primary_key=True)
    nombre = models.CharField(db_column='NOMBRE', max_length=30, blank=True, null=True)
    coddep = models.SmallIntegerField(db_column='CodDep', blank=True, null=True)
    equipo = models.CharField(max_length=20, blank=True, null=True)
    usuario = models.CharField(db_column='Usuario', max_length=15, blank=True, null=True)
    aperturapuesto = models.DateTimeField(db_column='AperturaPuesto', blank=True, null=True)
    mailpuesto = models.CharField(db_column='MailPuesto', max_length=4000, blank=True, null=True)
    mailpersonal = models.CharField(db_column='MailPersonal', max_length=4000, blank=True, null=True)
    nomofi = models.CharField(db_column='NOMOFI', max_length=30, blank=True, null=True)
    nompobl = models.CharField(db_column='NOMPOBL', max_length=20, blank=True, null=True)
    ubicacion = models.CharField(max_length=4000, blank=True, null=True)
    department = models.CharField(max_length=4000, blank=True, null=True)
    foto = models.BinaryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'empleadoss'
