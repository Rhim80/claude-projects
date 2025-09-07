#!/usr/bin/env python3
import pandas as pd
import re
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import time
from datetime import datetime
import csv

def extract_urls_from_text(text):
    """Extract URLs from text using regex"""
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, text)
    return urls

def get_final_url_and_title(url):
    """Get final URL after redirects and extract title"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Follow redirects and get final URL
        response = requests.get(url, headers=headers, allow_redirects=True, timeout=10)
        final_url = response.url
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            title = soup.find('title')
            if title:
                return final_url, title.get_text().strip()
            else:
                # Try to get title from meta tags
                meta_title = soup.find('meta', attrs={'property': 'og:title'})
                if meta_title:
                    return final_url, meta_title.get('content', '').strip()
                else:
                    return final_url, None
        else:
            return None, None
    except Exception as e:
        print(f"Error processing {url}: {e}")
        return None, None

def analyze_messages():
    # Read CSV file
    print("Reading CSV file...")
    df = pd.read_csv('/Users/rhim/Downloads/messages.csv')
    print(f"Total messages: {len(df)}")
    
    # Find messages with URLs
    print("Finding messages with URLs...")
    url_messages = []
    
    for idx, row in df.iterrows():
        message = str(row['Message'])
        urls = extract_urls_from_text(message)
        if urls:
            url_messages.append({
                'date': row['Date'],
                'user': row['User'],
                'message': message,
                'urls': urls,
                'message_idx': idx
            })
    
    print(f"Found {len(url_messages)} messages with URLs")
    
    # Create a list to store URL data with reaction analysis
    url_data = []
    
    for msg in url_messages:
        # Simple reaction analysis - count mentions/replies in subsequent messages
        # Look for messages within 1 hour after this message
        msg_time = pd.to_datetime(msg['date'])
        reaction_count = 0
        
        # Look at next 50 messages to count reactions
        start_idx = msg['message_idx'] + 1
        end_idx = min(start_idx + 50, len(df))
        
        for i in range(start_idx, end_idx):
            next_msg_time = pd.to_datetime(df.iloc[i]['Date'])
            # If more than 1 hour later, stop counting
            if (next_msg_time - msg_time).total_seconds() > 3600:
                break
            
            next_message = str(df.iloc[i]['Message']).lower()
            # Count as reaction if it's a short message (likely a reaction)
            if len(next_message) < 100:
                reaction_count += 1
        
        for url in msg['urls']:
            url_data.append({
                'date': msg['date'],
                'user': msg['user'],
                'original_message': msg['message'],
                'url': url,
                'reaction_count': reaction_count
            })
    
    print(f"Total URLs found: {len(url_data)}")
    
    # Sort by reaction count and get top 10%
    url_data.sort(key=lambda x: x['reaction_count'], reverse=True)
    top_10_percent = int(len(url_data) * 0.1)
    if top_10_percent < 1:
        top_10_percent = len(url_data)  # If less than 10 URLs, take all
    
    top_urls = url_data[:top_10_percent]
    print(f"Selected top {len(top_urls)} URLs (top 10%)")
    
    # Get titles for top URLs
    results = []
    for i, url_item in enumerate(top_urls):
        print(f"Processing URL {i+1}/{len(top_urls)}: {url_item['url']}")
        final_url, title = get_final_url_and_title(url_item['url'])
        
        if title:
            # Convert date to YYYY-MM-DD format
            date_obj = pd.to_datetime(url_item['date'])
            formatted_date = date_obj.strftime('%Y-%m-%d')
            
            results.append({
                '요약': title,
                'URL': final_url if final_url else url_item['url'],
                '날짜': formatted_date
            })
        
        # Add delay to be respectful
        time.sleep(1)
    
    print(f"Successfully processed {len(results)} URLs")
    
    # Save to CSV with proper encoding
    if results:
        with open('/Users/rhim/Projects/urls.csv', 'w', newline='', encoding='utf-8-sig') as csvfile:
            fieldnames = ['요약', 'URL', '날짜']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
            
            writer.writeheader()
            for row in results:
                writer.writerow(row)
        
        print(f"Successfully saved {len(results)} URLs to urls.csv")
    else:
        print("No URLs with valid titles found")

if __name__ == "__main__":
    analyze_messages()