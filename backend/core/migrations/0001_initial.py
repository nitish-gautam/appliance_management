# Generated by Django 5.2 on 2025-04-03 19:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(blank=True, max_length=300, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ReplacementOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('brand', models.CharField(max_length=100)),
                ('model_number', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('efficiency', models.CharField(blank=True, max_length=100, null=True)),
                ('matching_score', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Appliance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('brand', models.CharField(max_length=100)),
                ('model_number', models.CharField(max_length=100)),
                ('usage', models.CharField(blank=True, max_length=50, null=True)),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appliances', to='core.property')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheduled_date', models.DateField(blank=True, null=True)),
                ('scheduled_time', models.TimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('appliance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='core.appliance')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='core.property')),
                ('replacement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='core.replacementoption')),
            ],
        ),
    ]
