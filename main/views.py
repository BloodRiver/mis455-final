from django.shortcuts import render
from django.views import generic


class IndexView(generic.View):
    template_name = "main/index.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class AtAGlanceView(generic.View):
    template_name = "main/at_a_glance.html"
    
    def get(self, request):
        return render(request, self.template_name)


class FactsView(generic.View):
    template_name = "main/facts.html"
    
    def get(self, request):
        return render(request, self.template_name)


class VisionMissionView(generic.View):
    template_name = "main/vision_mission.html"
    
    def get(self, request):
        return render(request, self.template_name)


class SpecialInitiativesView(generic.View):
    template_name = "main/special.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class LeadershipView(generic.View):
    template_name = "main/leadership.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class AboutUsView(generic.View):
    template_name = "main/about_us.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class ResearchView(generic.View):
    template_name = "main/research.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
    
class ContactView(generic.View):
    template_name = "main/contact.html"
    
    def get(self, request):
        return render(request, self.template_name)


