# Generated by Django 5.0.3 on 2024-03-31 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseprofile',
            name='cv_title',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='baseprofile',
            name='text_title',
            field=models.CharField(max_length=100, null=True),
        ),
    ]