from django.shortcuts import render
from django.views import generic


class IndexView(generic.View):
    template_name = "main/index.html"
    
    def get(self, request):
        return render(request, self.template_name)
