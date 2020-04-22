from django.db import models


class TimestampedModel(models.Model):
    # A timestamp representing when this object was created.
    created_at = models.DateTimeField(auto_now_add=True)

    # # A timestamp reprensenting when this object was last updated.
    # updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

        # By default, any model that inherits from `TimestampedModel` should
        # be ordered in reverse-chronological order. We can override this on a
        # per-model basis as needed, but reverse-chronological is a good
        # default ordering for most models.
        ordering = ['-created_at']


class Logs(TimestampedModel):
    ID = models.AutoField(db_column='ID', primary_key=True)
    service = models.CharField(db_column='service', max_length=50)
    description = models.CharField(db_column='description', max_length=4000)
    justification = models.CharField(
        db_column='justification', max_length=4000)

    class Meta:
        db_table = 'history'
        managed = True
        verbose_name = 'Logs'
        verbose_name_plural = 'Logss'
