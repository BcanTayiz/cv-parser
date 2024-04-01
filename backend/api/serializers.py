from django.contrib.auth.models import User
from rest_framework import serializers
from .models import BaseProfile
from api.utils.content_parser import extract_title_and_content
from api.utils.cv_parser import translate_file_to_txt
import pdfplumber

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}  # Make password field required

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class BaseReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseProfile
        fields = ["id", "text_title", "text_content", "created_at", "text_cfr_level", "text_score", "cv_title","cv_content"]
        extra_kwargs = {"author": {"read_only": True}}

class CvScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseProfile
        fields = ["cv_score"]
        extra_kwargs = {"author": {"read_only": True}}

class CvTextChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseProfile
        fields = ["text_content","cv_content"]
        extra_kwargs = {"author": {"read_only": True}}
    

class BaseProfileSerializer(serializers.ModelSerializer):
    cv_file = serializers.FileField(write_only=True)  # Add this field to accept the PDF file

    class Meta:
        model = BaseProfile
        fields = ["id", "text_title", "text_content", "created_at", "text_cfr_level", "text_score", "cv_file"]
        extra_kwargs = {"author": {"read_only": True}}

    def create(self, validated_data):
        cv_file = validated_data.pop("cv_file", None)
        cv_title, cv_content = "", ""

        if cv_file:
            # Open the uploaded PDF file for parsing
            with pdfplumber.open(cv_file) as pdf:
                # Extract the text from the first page
                first_page_text = pdf.pages[0].extract_text()
                # Assuming cv_title is the first line and cv_content is the rest of the text
                lines = first_page_text.split("\n", 1)
                cv_title = lines[0].strip()
                cv_content = lines[1].strip() if len(lines) > 1 else ""

        # Add cv_title and cv_content to validated_data
        validated_data["cv_title"] = cv_title
        validated_data["cv_content"] = cv_content

        # Set the author based on the authenticated user
        validated_data["author"] = self.context["request"].user

        return super().create(validated_data)

