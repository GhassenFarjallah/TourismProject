# Generated by Django 5.0.7 on 2024-08-01 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Circuitrecommender', '0008_remove_tourism_dietaryrestrictions_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tourism',
            name='City',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='tourism',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
