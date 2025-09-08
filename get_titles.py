#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import time
import csv
from urllib.parse import urlparse
import urllib3

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def get_final_url_and_title(url):
    """Get final URL after redirects and extract title"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Follow redirects and get final URL
        response = requests.get(url, headers=headers, allow_redirects=True, timeout=15, verify=False)
        final_url = response.url
        
        if response.status_code == 200:
            # Try different encodings
            response.encoding = response.apparent_encoding or 'utf-8'
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Try to get title from various sources
            title = None
            
            # 1. Regular title tag
            title_tag = soup.find('title')
            if title_tag and title_tag.get_text().strip():
                title = title_tag.get_text().strip()
            
            # 2. og:title meta tag
            if not title:
                meta_title = soup.find('meta', attrs={'property': 'og:title'})
                if meta_title and meta_title.get('content'):
                    title = meta_title.get('content').strip()
            
            # 3. twitter:title meta tag
            if not title:
                twitter_title = soup.find('meta', attrs={'name': 'twitter:title'})
                if twitter_title and twitter_title.get('content'):
                    title = twitter_title.get('content').strip()
            
            # 4. h1 tag as fallback
            if not title:
                h1_tag = soup.find('h1')
                if h1_tag and h1_tag.get_text().strip():
                    title = h1_tag.get_text().strip()
            
            if title:
                # Clean up title
                title = title.replace('\n', ' ').replace('\r', ' ')
                title = ' '.join(title.split())  # Remove extra whitespace
                return final_url, title
            else:
                return None, None
        else:
            return None, None
            
    except Exception as e:
        print(f"Error processing {url}: {e}")
        return None, None

def process_urls():
    print("Processing URLs to get titles...")
    
    # Read URLs from file
    urls_to_process = []
    with open('/Users/rhim/Projects/top_urls.txt', 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if '|' in line:
                url, date = line.split('|', 1)
                urls_to_process.append({'url': url, 'date': date})
    
    print(f"Processing {len(urls_to_process)} URLs...")
    
    results = []
    failed_urls = []
    
    for i, url_item in enumerate(urls_to_process):
        url = url_item['url']
        date = url_item['date']
        
        print(f"Processing {i+1}/{len(urls_to_process)}: {url}")
        
        final_url, title = get_final_url_and_title(url)
        
        if title and title.strip():
            results.append({
                '요약': title,
                'URL': final_url if final_url else url,
                '날짜': date
            })
            print(f"  ✓ Success: {title[:50]}...")
        else:
            failed_urls.append(url)
            print(f"  ✗ Failed to get title")
        
        # Add delay to be respectful to servers
        time.sleep(0.5)
        
        # Save intermediate results every 20 URLs
        if (i + 1) % 20 == 0:
            print(f"Intermediate save at {i + 1} URLs...")
            with open('/Users/rhim/Projects/urls_temp.csv', 'w', newline='', encoding='utf-8-sig') as csvfile:
                fieldnames = ['요약', 'URL', '날짜']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
                writer.writeheader()
                for row in results:
                    writer.writerow(row)
    
    print(f"\nProcessing completed!")
    print(f"Successfully processed: {len(results)} URLs")
    print(f"Failed: {len(failed_urls)} URLs")
    
    # Save final results
    if results:
        with open('/Users/rhim/Projects/urls.csv', 'w', newline='', encoding='utf-8-sig') as csvfile:
            fieldnames = ['요약', 'URL', '날짜']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
            
            writer.writeheader()
            for row in results:
                writer.writerow(row)
        
        print(f"Successfully saved {len(results)} URLs to urls.csv")
        
        # Save failed URLs for reference
        if failed_urls:
            with open('/Users/rhim/Projects/failed_urls.txt', 'w', encoding='utf-8') as f:
                for url in failed_urls:
                    f.write(f"{url}\n")
            print(f"Saved {len(failed_urls)} failed URLs to failed_urls.txt")
    else:
        print("No URLs with valid titles found")

if __name__ == "__main__":
    process_urls()