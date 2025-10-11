# download-attachment

Download files from URLs to attachments folder and organize them with
descriptive names.

## Usage

```
/download-attachment <url1> [url2] [url3...]
```

## Examples

```
/download-attachment https://example.com/document.pdf
/download-attachment https://site.com/image.png https://site.com/report.pdf
```

## Implementation

You are tasked with downloading files from URLs and organizing them in the
Obsidian vault attachments folder.

### Step 1: Parse and Validate URLs

Extract the URL(s) from the user's input. Handle multiple URLs if provided.

- **Validate URL scheme**: Only allow http:// or https:// URLs
- **Reject invalid URLs**: file://, ftp://, or malformed URLs
- **Example validation**:

```bash
if [[ ! "$url" =~ ^https?:// ]]; then
  echo "Error: Only HTTP/HTTPS URLs are allowed"
  exit 1
fi
```

### Step 2: Download Files

For each URL:

```bash
# Create downloads folder if it doesn't exist
mkdir -p "00-inbox/downloads"

# Sanitize filename to prevent path traversal
# Remove ../ and other dangerous characters
filename=$(basename "$url" | sed 's/[^a-zA-Z0-9._-]/_/g')

# Use wget or curl to download with timeout
wget --timeout=30 -O "00-inbox/downloads/$filename" "$url"
# or
curl --max-time 30 -L "$url" -o "00-inbox/downloads/$filename"
```

### Step 3: Verify Downloads

Check that files were downloaded successfully:

```bash
ls -la "00-inbox/downloads/"
```

### Step 4: Organize Files

After downloading, run the organize-attachments command to rename files with
descriptive names:

For PDFs:

- Extract text with `pdftotext`
- Analyze content for meaningful title

For Images:

- Use `mcp__gemini-vision__analyze_image` or
  `mcp__gemini-vision__analyze_multiple`
- Generate descriptive filename based on content

### Step 5: Move to Organized (Optional)

If needed, move renamed files to appropriate project folders with descriptive names:
- `10-projects/[project-name]/attachments/`
- Keep in `00-inbox/downloads/` for weekly review processing

### Step 6: Update Index (Optional)

Can add entries to project documentation or keep in downloads for weekly processing

### Step 7: Commit Changes

```bash
git add -A
git commit -m "Download and organize attachments from URLs"
git push
```

## Important Notes

1. **File Naming**:
   - Initial download: Use URL filename or generate from URL
   - After analysis: Rename with descriptive title

2. **Supported Types**:
   - Images: .png, .jpg, .jpeg, .gif, .webp
   - Documents: .pdf, .doc, .docx
   - Text: .txt, .md
   - Data: .csv, .xlsx

3. **Error Handling**:
   - Check if URL is accessible
   - Verify file downloaded correctly
   - Handle download failures gracefully

4. **Organization**:
   - Downloaded files go to `00-inbox/downloads/`
   - After renaming, optionally move to project folders
   - Keep in downloads for weekly review processing
   - Update links across vault if needed

## Workflow

1. Download file(s) from provided URL(s) to `00-inbox/downloads/`
2. Identify file type and analyze content
3. Generate descriptive filename
4. Keep in downloads folder for weekly review
5. (Weekly review: move to appropriate project folders)
6. Commit and push changes

## Tips

- For multiple URLs, process them in batch for efficiency
- Use Gemini Vision for batch image analysis (up to 3 at once)
- Extract meaningful context from PDFs before renaming
- Preserve original file extensions
- Keep filenames concise but descriptive (max 60 chars)

## Related Notes

- [[10-projects/14-brand-identity/14.01-brand-builder/brand-identity-ai/Brand-Identity-Builder-Design/src/guidelines/Guidelines]] - ai_automation 관련; 'usage' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/awesome-claude-code/resources/slash-commands/update-docs/update-docs]] - ai_automation 관련; 'implementation' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.claude/commands/update-architecture]] - ai_automation 관련; 'usage' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.claude/commands/create-task]] - ai_automation 관련; 'usage' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.claude/commands/analyze-project]] - ai_automation 관련; 'usage' 개념 공유
