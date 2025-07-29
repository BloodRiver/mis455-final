from django.urls import path
from . import views

app_name = "portal"

urlpatterns = [
    path("", views.redirect_view, name="home"),
    path("login", views.LoginView.as_view(), name="login"),
    path("dashboard", views.DashboardView.as_view(), name="dashboard"),
    path("course-registration-and-add-drop", views.CourseRegistrationAddDropView.as_view(), name="registration_add_drop")
]
