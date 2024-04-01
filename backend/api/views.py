from django.urls import path
from rest_framework.generics import ListAPIView, ListCreateAPIView, DestroyAPIView, CreateAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BaseProfile
from .serializers import BaseProfileSerializer, UserSerializer,BaseReturnSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .serializers import CvScoreSerializer,CvTextChangeSerializer
from api.utils.cv_score import calculate_score
from rest_framework import generics
from django.shortcuts import get_object_or_404


class BaseProfileListView(ListAPIView):
    queryset = BaseProfile.objects.all()
    serializer_class = BaseReturnSerializer
    permission_classes = [IsAuthenticated]

class BaseProfileCreateView(ListCreateAPIView):
    queryset = BaseProfile.objects.all()
    serializer_class = BaseProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def create(self, request, *args, **kwargs):
        print("c")
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except ValidationError as e:
            print("Validation Error:", e.detail)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

class BaseProfileDelete(DestroyAPIView):
    queryset = BaseProfile.objects.all()
    serializer_class = BaseProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(author=self.request.user)
    
class CvScoreView(RetrieveAPIView):
    queryset = BaseProfile.objects.all()
    serializer_class = CvScoreSerializer
    print('a')

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            cv_text = instance.cv_content  # Assuming cv_content contains the text of the CV
            job_description = instance.text_content  # Using text_content field as job description
            score_float = calculate_score(cv_text, job_description)
            print(score_float)
            score = round(score_float*100)
            print('b',score)

            data = {"cv_score": score}
            try:
                serializer = self.serializer_class(data=data)  # Use serializer_class attribute instead of get_serializer
                serializer.is_valid(raise_exception=True)
            except Exception as e:
                print(e)

            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        
class CvTextChangeView(generics.UpdateAPIView):
    queryset = BaseProfile.objects.all()
    serializer_class = CvTextChangeSerializer
    permission_classes = [IsAuthenticated]

class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]