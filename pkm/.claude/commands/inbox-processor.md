# Inbox Processor

Help organize and process items in the 00-inbox folder according to the Johnny Decimal
method.

## Task

Review all notes in `00-inbox/` and help categorize them:

1. **Scan the Inbox**
   - List all files currently in 00-inbox
   - Exclude README.md, Welcome.md, and downloads/ folder

2. **Analyze Each Item**
   - Read the content
   - Identify the type of note
   - Suggest appropriate destination

3. **Categorization Rules**
   - **→ 10-projects**: Has deadline, specific outcome
   - **→ 20-operations**: Ongoing responsibility, operations
   - **→ 30-knowledge**: Reference material, knowledge, frameworks
   - **→ 40-personal**: Personal notes, ideas, daily notes
   - **→ 90-archive**: Old/completed, no longer active
   - **→ Delete**: No value, redundant, or temporary

4. **Suggest Actions**

   ```
   File: [filename]
   Type: [detected type]
   Destination: [suggested folder]
   Reason: [why this categorization]
   Related to: [any existing notes it connects to]
   ```

5. **Identify Patterns**
   - Common themes across multiple notes
   - Notes that could be combined
   - Missing connections between items

## Output Format

Provide a clear action plan:

1. Items to move (with destinations)
2. Items to combine or link
3. Items to delete
4. Items needing more context

## Remember

- Some items legitimately belong in the Inbox (temporary captures, downloads folder)
- Don't over-organize - sometimes "good enough" is perfect
- Look for opportunities to connect ideas, not just file them
- downloads/ folder is managed separately (weekly review)

## Related Notes

- [[00-inbox/Welcome]] - pkm_systems, ai_automation 관련; 'remember' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.ab-method/core/resume-task]] - ai_automation 관련; 'remember' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.ab-method/core/resume-mission]] - ai_automation 관련; 'remember' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.ab-method/utils/backend-mission]] - ai_automation 관련; 'remember' 개념 공유
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.ab-method/utils/frontend-mission]] - ai_automation 관련; 'remember' 개념 공유
