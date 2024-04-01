import pdfplumber
import re


def extract_title_and_content(text):
    # Define a regular expression pattern to match the title
    title_pattern = r'^([A-Za-z\s]+):'  # This pattern assumes the title ends with a colon

    # Initialize variables to store the title and content
    title = None
    content = text.strip()  # Assume the entire text is the content initially

    # Search for the title pattern in the text
    match = re.search(title_pattern, text, re.MULTILINE)
    if match:
        # Extract the title and content based on the match
        title = match.group(1).strip()
        content = text[match.end():].strip()

    return title, content

def parse_pdf_to_text(pdf_file_path, output_file_path):
    with pdfplumber.open(pdf_file_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    
    with open(output_file_path, "w", encoding="utf-8") as output_file:
        output_file.write(text)

if __name__ == "__main__":
    pdf_file_path = "input.pdf"  # Replace with the path to your PDF file
    output_file_path = "output.txt"  # Replace with the desired output file path
    parse_pdf_to_text(pdf_file_path, output_file_path)
