from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, MinValueValidator, MaxValueValidator
from api.utils.cv_parser import parse_pdf_to_text, extract_title_and_content

class BaseProfile(models.Model):
    
    text_title = models.CharField(max_length=100,null=True)
    text_content = models.TextField(default="content")
    created_at = models.DateTimeField(auto_now_add=True)
    text_cfr_level = models.CharField(max_length=100, validators=[MinLengthValidator(2)], null=True, blank=True)
    text_score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    cv_title = models.CharField(max_length=255,null=True)
    cv_content = models.TextField(default="cv title")
    cv_file = models.FileField(null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profiles")
    cv_score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)],null=True,blank=True)
    
    def __str__(self):
        return f"Profile for {self.author.username}"

    def parse_and_set_cv_data(self, cv_file):
        cv_text = parse_pdf_to_text(cv_file)
        title, content = extract_title_and_content(cv_text)
        self.cv_title = title
        self.cv_content = content
