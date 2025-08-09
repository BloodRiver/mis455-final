from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Course)
admin.site.register(models.CourseSection)
admin.site.register(models.EnrolledCourse)
