from datetime import datetime
from pydoc import describe
from tkinter import CASCADE
from turtle import title
from django.db import models

# Create your models here:

#category
class category(models.Model):
    type = models.CharField(max_length=50)
    description=models.TextField()
    
#task
class task(models.Model):
    # user_id=models.ForeignKey()
    title=models.CharField(max_length=100)
    category=models.ForeignKey(to=category,on_delete=models.CASCADE)
    progress=models.IntegerField()
    

#activities
class activities(models.Model):
    task_id=models.ForeignKey(to=task,on_delete=models.CASCADE)
    name= models.CharField(max_length=100)
    describe= models.TextField()
    time= models.DateTimeField()

    
#comments
class comments(models.Model):
    task_id=models.ForeignKey(to=task,on_delete=models.CASCADE)
    activity_id=models.ForeignKey(to=activities, on_delete=models.CASCADE)
    timestamp=models.DateTimeField()
    content=models.TextField()
    
    
#link
class link(models.Model):
    task_id = models.ForeignKey(to=task,on_delete=models.CASCADE)
    source_id=models.ForeignKey(to=activities, on_delete=models.CASCADE)
    dest_id=models.ForeignKey(to=activities, on_delete=models.CASCADE)
    
    
#kanban board
class kanban_board(models.Model):
    task_id=models.ForeignKey(to=task,on_delete=models.CASCADE)