# api/utils/cv_parser.py
import os
from api.utils.content_parser import parse_pdf_to_text
from api.utils.content_parser import extract_title_and_content

def translate_file_to_txt(file_path):
    # Determine the file extension
    file_name, file_extension = os.path.splitext(file_path)

    # If the file is a PDF, parse it to TXT
    if file_extension.lower() == '.pdf':
        txt_file_path = f"{file_name}.txt"
        parse_pdf_to_text(file_path, txt_file_path)
    # If the file is already a TXT, use it directly
    elif file_extension.lower() == '.txt':
        txt_file_path = file_path
    else:
        raise ValueError("Unsupported file format. Only PDF and TXT files are supported.")

    # Extract title and content from the TXT file
    title, content = extract_title_and_content(txt_file_path)

    return title, content
