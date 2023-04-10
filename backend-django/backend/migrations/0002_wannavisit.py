# Generated by Django 4.1.7 on 2023-03-06 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polyglottal_project', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WannaVisit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city_name', models.CharField(max_length=32, unique=True)),
                ('country_name', models.CharField(max_length=32)),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
            ],
        ),
    ]
