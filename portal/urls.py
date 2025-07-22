from django.urls import path
from . import views

app_name = "portal"

urlpatterns = [
    path("", views.redirect_view, name="home"),
    path("login", views.LoginView.as_view(), name="login"),
    path("dashboard", views.DashboardView.as_view(), name="dashboard")
]
