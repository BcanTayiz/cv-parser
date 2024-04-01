import re
from collections import Counter
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_text(text):
    # Convert text to lowercase
    text = text.lower()
    # Remove non-alphanumeric characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Tokenize the text into words
    tokens = text.split()
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    return tokens

def calculate_score(cv_text, job_description):
    # Preprocess CV and job description
    cv_tokens = preprocess_text(cv_text)
    job_tokens = preprocess_text(job_description)

    # Convert tokens to strings for TF-IDF vectorizer
    cv_text = ' '.join(cv_tokens)
    job_text = ' '.join(job_tokens)

    # Compute TF-IDF vectors
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([cv_text, job_text])

    # Compute cosine similarity between CV and job description
    cosine_sim = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]

    return cosine_sim

# Example usage:
cv_text = "Experienced software engineer with proficiency in Python, Java, and SQL."
job_description = "Seeking a software engineer proficient in Python, Java, and SQL."
score = calculate_score(cv_text, job_description)
print("CV Score:", score)