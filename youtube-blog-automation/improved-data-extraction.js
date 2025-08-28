// 개선된 YouTube 정보 추출 로직
function extractYouTubeInfo(notionData) {
  const extractors = [
    // Primary extractors
    data => data.property_url,
    data => data.properties?.URL?.url,
    data => data.properties?.url?.url,
    data => data.properties?.링크?.url,
    data => data.properties?.["원본 영상"]?.url,
    
    // Fallback extractors  
    data => {
      // Search all properties for URL-like values
      const props = data.properties || {};
      for (const [key, value] of Object.entries(props)) {
        if (value?.url && value.url.includes('youtube.com')) {
          return value.url;
        }
      }
      return null;
    }
  ];

  // Try each extractor
  for (const extract of extractors) {
    try {
      const url = extract(notionData);
      if (url && typeof url === 'string') {
        const videoId = extractVideoId(url);
        if (videoId) {
          return {
            success: true,
            youtubeUrl: url,
            videoId: videoId,
            extractor: extractors.indexOf(extract)
          };
        }
      }
    } catch (error) {
      console.log(`Extractor ${extractors.indexOf(extract)} failed:`, error.message);
    }
  }

  return {
    success: false,
    error: 'No valid YouTube URL found',
    debugInfo: {
      availableProperties: Object.keys(notionData.properties || {}),
      directProperties: Object.keys(notionData).filter(k => k.startsWith('property_'))
    }
  };
}

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

module.exports = { extractYouTubeInfo, extractVideoId };