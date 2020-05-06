from django.db import models


class ConexionesSQL(models.Model):
    bbdd = models.CharField(db_column='BASE_DATOS',max_length=50, primary_key=True)
    aplicacion = models.CharField(db_column='APLICACION', max_length=50)
    n_conexiones = models.IntegerField(db_column='N_CONEXIONES')

    class Meta:
        managed = False
        db_table = 'v_conexiones'
