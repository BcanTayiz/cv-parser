# urls.py
from django.urls import path
from .views import BaseProfileCreateView, BaseProfileDelete,BaseProfileListView,CvScoreView,CvTextChangeView


urlpatterns = [
    path('profiles/', BaseProfileListView.as_view(), name='profile-list'),
    path('profiles/create/', BaseProfileCreateView.as_view(), name='profile-create'),
    path('profiles/score/<int:pk>/', CvScoreView.as_view(), name='cv_score'),
    path('profiles/delete/<int:pk>/', BaseProfileDelete.as_view(), name='profile-delete'),
    path('profiles/change-text/<int:pk>/', CvTextChangeView.as_view(), name='cv-text-change'),
]