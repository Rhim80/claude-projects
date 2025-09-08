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

def analyze_messages_quick():
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
        msg_time = pd.to_datetime(msg['date'])
        reaction_count = 0
        
        # Look at next 20 messages to count reactions (reduced from 50)
        start_idx = msg['message_idx'] + 1
        end_idx = min(start_idx + 20, len(df))
        
        for i in range(start_idx, end_idx):
            try:
                next_msg_time = pd.to_datetime(df.iloc[i]['Date'])
                # If more than 30 minutes later, stop counting (reduced from 1 hour)
                if (next_msg_time - msg_time).total_seconds() > 1800:
                    break
                
                next_message = str(df.iloc[i]['Message']).lower()
                # Count as reaction if it's a short message (likely a reaction)
                if len(next_message) < 100:
                    reaction_count += 1
            except:
                continue
        
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
    top_10_percent = max(1, int(len(url_data) * 0.1))
    
    top_urls = url_data[:top_10_percent]
    print(f"Selected top {len(top_urls)} URLs (top 10%)")
    
    # Print top URLs for verification
    print("\nTop URLs by reaction count:")
    for i, url_item in enumerate(top_urls[:10]):  # Show first 10
        print(f"{i+1}. {url_item['url']} (reactions: {url_item['reaction_count']})")
    
    # Save URLs to a simple file for processing
    with open('/Users/rhim/Projects/top_urls.txt', 'w', encoding='utf-8') as f:
        for url_item in top_urls:
            date_obj = pd.to_datetime(url_item['date'])
            formatted_date = date_obj.strftime('%Y-%m-%d')
            f.write(f"{url_item['url']}|{formatted_date}\n")
    
    print(f"Saved {len(top_urls)} URLs to top_urls.txt for title extraction")

if __name__ == "__main__":
    analyze_messages_quick()