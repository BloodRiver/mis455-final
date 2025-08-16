from django.urls import path
from . import views


app_name = "main"

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("at-a-glance", views.AtAGlanceView.as_view(), name="at_a_glance"),
    path("facts", views.FactsView.as_view(), name="facts"),
    path('vision-and-mission', views.VisionMissionView.as_view(), name="vision_and_mission"),
    path("special-initiatives", views.SpecialInitiativesView.as_view(), name="special_initiatives"),
    path('leadership', views.LeadershipView.as_view(), name="leadership"),
    path("about-us-message", views.AboutUsView.as_view(), name="about_us"),
    path("research", views.ResearchView.as_view(), name="research"),
    path("contact-us", views.ContactView.as_view(), name="contact")
]
