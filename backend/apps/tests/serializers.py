from rest_framework import serializers
from .models import InventarioHard, ConexionesSQL

class SqlSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConexionesSQL
        fields = '__all__'

