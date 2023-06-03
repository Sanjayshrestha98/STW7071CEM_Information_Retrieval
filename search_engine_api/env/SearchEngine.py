#!/usr/bin/env python
# coding: utf-8

import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
import ujson
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from collections import defaultdict
import math
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi_pagination import Page, paginate
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

#Preprosessing data before indexing
with open('resultssss.json', 'r') as doc: scraper_results=doc.read()

pubName = []
pubURL = []
pubCUAuthor = []
pubDate = []
data_dict = ujson.loads(scraper_results)
array_length = len(data_dict)


#Seperate name, url, date, author in different file
for item in data_dict:
    pubName.append(item["name"])
    pubURL.append(item["pub_url"])
    pubCUAuthor.append(item["cu_author"])
    pubDate.append(item["date"])


#Open a file with publication names in read mode


print("pubName", len(pubName))

stemmer = PorterStemmer()
pub_list_after_stem = []
pub_list = []

stop_words = set(stopwords.words("english"))


def removeStopWord(text):
    # Convert text to lowercase
    text = text.lower()
    
    # Remove special characters, punctuation, and numbers
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    
    # Tokenize the text into individual words
    words = text.split()
    
    words = [word for word in words if word not in stop_words]
    
    # Stem and lemmatize words
    stemmer = PorterStemmer()
    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(stemmer.stem(word)) for word in words]
    
    
    # Join the processed words back into a single string
    processed_text = " ".join(words)
    
    return processed_text

for file in pubName:
    preprocess_text = removeStopWord(file)
    pub_list_after_stem.append(preprocess_text)
    pub_list.append(file)

def construct_inverted_index(documents):
    inverted_index = defaultdict(list)
    
    for doc_id, doc in enumerate(documents):
        terms = doc.split()
        
        # Update the inverted index for each term in the document
        for term in terms:
            inverted_index[term].append(doc_id)
    
    return inverted_index


# Construct the inverted index
inverted_index = construct_inverted_index(pub_list_after_stem)

def search(query=''):
    totalData = len(data_dict)
    data = data_dict
    if query == '':
        return {
            'data': data,
            'totalData': totalData
        }
    # Preprocess the query
    processed_query = removeStopWord(query)

    # Tokenize the query
    query_terms = processed_query.split()
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(pub_list_after_stem)

    # Retrieve relevant documents using inverted index
    relevant_docs = set()
    for term in query_terms:
        if term in inverted_index:
            relevant_docs.update(inverted_index[term])

    relevant_docs = list(relevant_docs)

    # Calculate cosine similarity for relevant documents
    tfidf_query = vectorizer.transform([processed_query])
    cosine_similarities = cosine_similarity(tfidf_query, tfidf_matrix[relevant_docs])
    
    # Sort the relevant documents based on similarity scores
    sorted_docs = sorted(zip(relevant_docs, cosine_similarities[0]), key=lambda x: x[1], reverse=True)

    # Retrieve similar documents
    data = [data_dict[idx] for idx, _ in sorted_docs]
    
    return {
            'data': data,
            'totalData': len(data)
        }

