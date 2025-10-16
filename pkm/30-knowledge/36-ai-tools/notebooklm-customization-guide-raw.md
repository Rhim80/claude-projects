[![The AI Maker](https://substackcdn.com/image/fetch/$s_!Og-U!,w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F38aaec92-ae56-46b5-9aef-79b9a0b0a017_1080x1080.png)](https://aimaker.substack.com/)

# [![The AI Maker](https://substackcdn.com/image/fetch/$s_!7IAm!,e_trim:10:white/e_trim:10:transparent/h_72,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F78f297e6-ab00-4b6d-98f8-3f3bd32406ad_1344x256.png)](https://aimaker.substack.com/)

SubscribeSign in

![User's avatar](https://substackcdn.com/image/fetch/$s_!zTXR!,w_64,h_64,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ac42946-717d-4e50-8477-551c5d7a3025_1638x1638.jpeg)

Discover more from The AI Maker

Making AI accessible for everyday life. Simple strategies to build smarter, work faster, and live better.

Over 6,000 subscribers

Subscribe

By subscribing, I agree to Substack's [Terms of Use](https://substack.com/tos), and acknowledge its [Information Collection Notice](https://substack.com/ccpa#personal-data-collected) and [Privacy Policy](https://substack.com/privacy).

Already have an account? Sign in

# NotebookLM Got Crazy Powerful: Here's How I Used It to Learn Something Really Hard

### And some useful prompts to customize my learning.

[![Wyndo's avatar](https://substackcdn.com/image/fetch/$s_!zTXR!,w_36,h_36,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ac42946-717d-4e50-8477-551c5d7a3025_1638x1638.jpeg)](https://substack.com/@wyndo)

[Wyndo](https://substack.com/@wyndo)

Oct 09, 2025

478

[74](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comments)
55

Share

[![](https://substackcdn.com/image/fetch/$s_!IB4l!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a99ebdc-88de-4602-9969-3dded45f1b10_1536x1024.png)](https://substackcdn.com/image/fetch/$s_!IB4l!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7a99ebdc-88de-4602-9969-3dded45f1b10_1536x1024.png)

**I wanted to build my own [AI agent](https://aimaker.substack.com/s/maker-labs) chatbot for my newsletter with [RAG](https://aimaker.substack.com/p/he-built-google-for-newsletters-substack-how-ai-actually-works-rag-retrieval-augmented-generation-and-semantic-search) (Retrieval Augmented Generation) capabilities using LangChain.**

But, I had no idea where to start.

Every tutorial assumed I already understood vector databases, embeddings, and retrieval pipelines. Documentation was written for developers who lived and breathed Python. Stack Overflow threads casually threw around terms like “chunking strategies” and “similarity search” like everyone should just know what that meant.

I was stuck in that frustrating place where you know enough to be dangerous but not enough to be useful. I understood ChatGPT and [Claude](https://aimaker.substack.com/p/the-ultimate-guide-to-turn-claude-project-knowledge-into-your-brain-most-valuable-coworker). I’d built automations in [Make.com](https://aimaker.substack.com/p/how-to-automate-rss-feed-digest-ai-substack-makecom-tutorial), Zapier, n8n, Relay, etc., that felt pretty sophisticated.

But LangChain?

Building actual AI agents from code?

That felt like I was being asked to perform surgery after only watching YouTube videos.

**The gap between no-code automation and actual AI agent development felt impossibly wide. I couldn’t comprehend it.**

Then I remembered [the tool](https://aimaker.substack.com/t/tool-mastery) that had already changed my learning once before.

Six months ago, when I was just starting [AI Maker](https://aimaker.substack.com/) newsletter, I wrote about [NotebookLM](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm). If this is your first time hearing about it, you might want to check that post to learn the basics. That post became my most popular piece by far—readers clearly connected with the idea of turning AI into [a personalized learning system](https://aimaker.substack.com/p/how-learning-spanish-3x-faster-using-claude-artifact-project-no-coding-required) instead of just another research tool.

[![How I Learned Complex Topics 10x Faster with NotebookLM](https://substackcdn.com/image/fetch/$s_!V_5I!,w_140,h_140,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cff0964-a5b2-4273-ba77-8277640f0c73_1536x1024.png)](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm)

[**How I Learned Complex Topics 10x Faster with NotebookLM**](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm)

[Wyndo](https://substack.com/profile/556836-wyndo)

·

Apr 3

[Read full story](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm)

**But here’s what I didn’t expect:** NotebookLM itself kept evolving.

While I was focused on building [AI automation workflows](https://aimaker.substack.com/p/how-i-finally-turned-ai-into-managing-actual-personal-operating-system-workflow-mcp-model-context-protocol-guide-claude) and exploring new AI tools, NotebookLM quietly added features that completely changed what’s possible. We’re not talking about minor updates—we’re talking about the ability to customize _how_ AI teaches you based on exactly where you are in your learning journey.

**And that changes everything when you’re trying to bridge the gap from no-code to actual development of building an agent.**

So when I hit the wall with LangChain and RAG systems to build AI agent, I went back to NotebookLM. But this time, instead of just uploading sources and asking questions, I built a complete learning ecosystem that met me exactly where I was: consider me as an AI operator who understood AI concepts but had never built anything with agent development.

[![](https://substackcdn.com/image/fetch/$s_!8Op9!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8072fee8-4316-47fa-8b1b-fe308bd1830e_2302x1358.png)](https://substackcdn.com/image/fetch/$s_!8Op9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8072fee8-4316-47fa-8b1b-fe308bd1830e_2302x1358.png) NotebookLM Mental Model by Jason Spielman

Before we continue, a quick shoutout for [Jason Spielman](https://x.com/jayspiel_), the artist and designer lead behind NotebookLM. His early sketches and experiments made today’s version possible. I was surprised by the complexity of the design—like watching a factory‑finished product arrive at your door, ready to use. If you enjoy the art of building a product, you might want to check out [his NotebookLM’s early story](https://jasonspielman.com/notebooklm).

It’s beautiful, I promise!

* * *

Now, back to the point.

Here’s what happened when I stopped trying to learn like a developer and instead built a system that matched how my brain actually works.

## The learning system I built

Before I even started learning, I had to solve the first problem: **What should I actually be reading?**

When you’re learning something completely new, you don’t even know which sources are good. Google “LangChain RAG tutorial” and you get 10,000 results.

Which ones are for beginners? Which ones are outdated? Which ones assume knowledge I don’t have?

This is where NotebookLM’s “Discover” feature became my first breakthrough.

Subscribe

## Phase 1: Curating the right sources (not just any sources)

[![](https://substackcdn.com/image/fetch/$s_!dvdy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F13d57726-49f0-4521-8808-d5477fb4f896_2410x1659.jpeg)](https://substackcdn.com/image/fetch/$s_!dvdy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F13d57726-49f0-4521-8808-d5477fb4f896_2410x1659.jpeg)

Most people don’t realize you can customize _what kind_ of sources NotebookLM finds for you. Instead of just asking “find me information about RAG,” you can be specific about the SOURCE TYPE you need.

**Here’s how I used Discover customization:**

### Customization \#1

> “Find me sources from Reddit only”

Reddit threads have real developers admitting what makes them confused. You get threads like “I’m a beginner trying to understand RAG, here’s what finally made it click.” These people usually one step ahead of you explaining their breakthroughs. Perfect for building initial mental models without making things complicated with buzzwords and jargons.

### Customization \#2

> “Find me YouTube videos only”

YouTube has been my biggest learning source over the years because it usually has beginner guides I can easily follow. It’s also packed with content that can take you from beginner to intermediate.

### Customization \#3

> “Find me official documentation PDFs from LangChain, OpenAI, and ChromaDB only”

Documentation is useless if you start here—it’s written for people who already understand basics. But once you have mental models from Reddit and YouTube, official docs suddenly make sense. Specifying “PDF only” or “from LangChain.com” prevents random blog posts and ensures authoritative sources.

### Customization \#4

> “Find me sources from top tech publications only—AWS blogs, Google Cloud documentation, enterprise case studies”

These sources explain WHY companies build RAG systems and real-world architecture decisions. Once you understand HOW to build, you need production best practices, cost optimization, and security considerations that only enterprise sources cover.

By customizing the types of sources, I create a diverse set of materials to deepen my understanding of the topic I’m learning. This helps me avoid bias from any single publication and lets me see multiple perspectives, which makes my learning stronger than ever.

Additionally, you can use files in your Google Drive as sources. This is a new feature they recently added.

* * *

[![](https://substackcdn.com/image/fetch/$s_!28zy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9128b348-2ee3-4783-a719-22b965cbcfad_3439x1162.jpeg)](https://substackcdn.com/image/fetch/$s_!28zy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9128b348-2ee3-4783-a719-22b965cbcfad_3439x1162.jpeg) Perplexity Deep Research + NotebookLM Powerful Combo for Sources Collection

_**🚨 Pro tip:** Want to level up your sources collection? Use Perplexity’s Deep Research to collect high‑quality sources, then ask it to compile the citations as raw links. Copy those links into NotebookLM as your source set. Now you’ve got a curated research hub, fast._

* * *

## Phase 2: Building foundation through different learning styles

After curating my sources, I had the raw materials. Now I needed to actually learn from them. But here’s the problem: sitting down to read documentation felt overwhelming, and I had limited focused time each day.

This is where NotebookLM’s multi‑format generation shines. Instead of forcing one learning style, I matched formats to context—audio for commuting, video for visual clarity, and written reports for depth.

Let’s break them down.

### 1\. Build the base with customized reports

[![NotebookLM Customized Report](https://substackcdn.com/image/fetch/$s_!jzsZ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dabcc3c-0af9-4a1b-91b6-5f0f4d01a469_1722x926.png)](https://substackcdn.com/image/fetch/$s_!jzsZ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dabcc3c-0af9-4a1b-91b6-5f0f4d01a469_1722x926.png)

When I was about to learn something new,I didn’t even know what I didn’t know. Terms like “vector embeddings,” “semantic search,” and “retrieval pipelines” were everywhere, but I couldn’t tell which ones were essential vs nice-to-have.

**NotebookLM has a Report feature with multiple formats:** blog posts, briefing documents, study guides, and four additional auto‑suggested options based on the documents you upload. You can generate them using custom instructions or write your own.

But, I’d like to start from my own.

Here are some custom instructions you can follow to create your own report:

#### Customization \#1: Anchor new knowledge to what you already know

**Instruction:**

_“Explain \[NEW TOPIC\] by contrasting it with \[SOMETHING I ALREADY UNDERSTAND\]”_

**My example:**

> “Explain LangChain and RAG by contrasting them with how make.com work”

**Why this worked:** Instead of learning in a vacuum, I anchored new concepts to something I already understood.

**NotebookLM explained:** “In Make.com, you build workflows that follow predetermined steps. With LangChain, you’re building systems where the AI decides which steps to take based on the user’s question. Make.com is a recipe you follow exactly. LangChain is giving the AI ingredients and letting it cook.”

Suddenly, I understood why I needed to learn this differently.

#### Customization \#2: Progressive complexity layering

**Instruction:**

_“Start with the simplest possible explanation of \[TOPIC\], then layer in complexity”_

**My example:**

> “Start with the simplest possible explanation of RAG, then layer in complexity”

**Why this worked:** Prevented information overload on day one.

**What I learned:**

- **Simple version:** RAG = giving AI access to your own documents so it can answer questions about them

- **Next layer:** It works by converting documents into numbers (embeddings) and finding relevant chunks when users ask questions

- **Technical layer:** Vector databases store embeddings, similarity search retrieves relevant chunks, LLM generates answers using retrieved context


Each layer built on the previous one instead of dumping everything at once.

#### Customization \#3: Skill level progression map

**Instruction:**

_“Explain this topic in 4 passes: (1) Absolute beginner with no jargon, (2) Intermediate with key terms, (3) Advanced with technical depth, (4) Expert-level insights about what most people get wrong”_

**My example:**

> “Used this to understand the progression from simple chatbot → documentation assistant → research agent”

**Why this worked:** Gave me a progression path instead of trying to build the advanced version immediately.

**The clarity I gained:**

- **Beginner:** FAQ chatbot (needs: basic RAG, simple embeddings, single source)

- **Intermediate:** Documentation assistant (needs: chunk optimization, multiple sources, metadata filtering)

- **Advanced:** Research agent (needs: complex retrieval strategies, re-ranking, citation tracking)

- **Expert-level insights:** AI agent is best use for specific case rather than a broad use


I realized I didn’t need to master everything—I just needed to build the beginner version first.

### 2\. Audio overview to build a customized podcast

[![NotebookLM Audio Overview Podcast](https://substackcdn.com/image/fetch/$s_!Vj7q!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39d47ed6-4775-4d16-9e35-ff4a1cab4ada_1822x1282.png)](https://substackcdn.com/image/fetch/$s_!Vj7q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39d47ed6-4775-4d16-9e35-ff4a1cab4ada_1822x1282.png)

Now that I had absorbed the written report, but I needed reinforcement during “dead time.”

**For example:** my afternoon walk and gym sessions.

NotebookLM’s Audio Overview creates podcast-style conversations between two AI hosts. You can customize the format (Deep Dive, Brief, Critique, Debate), the length, AND the focus. And you can ask questions as it plays.

* * *

_**🚨 Pro tip:** NotebookLM’s mobile app lets me listen on the go, but I want more control. I’d like to download the podcast and upload it to Spotify, so it’s one tap away and blends seamlessly with the playlists I already follow._

* * *

Here’s my three-podcast strategy that worked incredibly well:

#### Customization \#1: Beginner interviewing expert

**The setup:**

Use **“Deep Dive”** format with default length.

**Instruction:**

_Target a specific audience: Have the first host act as a complete beginner who knows nothing about \[TOPIC\], and the second host act as an expert. The beginner should interview the expert, asking basic questions someone new would actually ask.”_

**My example:**

> “Have the first host act as a complete beginner who knows nothing about AI agents, and the second host act as an expert. The beginner should interview the expert about building RAG systems.”

**Why this works:**

- You hear YOUR actual questions being asked by the beginner host

- The expert explains without assuming prior knowledge

- The interview format feels natural, not like a lecture


**What I heard:**

- Beginner: “Okay, but why can’t I just paste my documents into ChatGPT?”

- Expert: “Great question! Here’s the problem with that approach...”


This felt like listening to myself learn in real-time.

#### Customization \#2: Expert debate

**The setup:**

Use **“Debate”** format with default length.

**Instruction:**

_“Have two experts debate different approaches to \[TOPIC\]. One argues for \[APPROACH A\], the other argues for \[APPROACH B\]. They should discuss tradeoffs, not just argue who’s right.”_

**My example:**

> “Have two experts debate whether beginners should start with simple RAG or jump straight to advanced retrieval strategies. Discuss the tradeoffs of each approach.”

**Why this works:**

- Hearing both sides prevents you from thinking there’s only one “right” way

- You learn decision-making frameworks, not just facts

- Shows you what experienced people actually argue about


**What I heard:**

- Expert 1: “Start simple so you understand fundamentals”

- Expert 2: “But simple approaches create bad habits you have to unlearn”

- Both: Discussion of when each makes sense


This helped me understand there are different paths I can pursue, not one perfect answer.

#### Customization \#3: Expert critique

**The Setup:**

Use **“Critique”** format with default length.

**Instruction:**

_“Have an expert review the sources and offer constructive criticism: What’s missing? What’s oversimplified? What do beginners commonly misunderstand from this material?”_

**My example:**

> “Have an expert review these RAG tutorials and point out what’s missing, what’s oversimplified, and what beginners commonly misunderstand.”

**Why this works:**

- Reveals gaps in the sources you collected

- Warns you about common misconceptions BEFORE you develop them

- Shows you what to be skeptical about


**What I heard:**

- “These tutorials make RAG look simple, but they skip chunk optimization entirely”

- “Most guides don’t mention that your first RAG system will probably return bad results”

- “Notice how none of these sources discuss cost implications”


This critique saved me from thinking I understood everything after the first two listens.

### 3\. Visual clarity using customized video overview

[![NotebookLM Video Overview](https://substackcdn.com/image/fetch/$s_!8qxd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbcc48cb-0348-44d3-8acd-dadeaf793368_3518x1136.jpeg)](https://substackcdn.com/image/fetch/$s_!8qxd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbcc48cb-0348-44d3-8acd-dadeaf793368_3518x1136.jpeg)

Now that I’ve understood the concepts by reading and listening, sometimes I still need someone to explain it like a 101 presentation, something that gets me up to speed and levels me up to more complex topics. This is where video comes into play.

**NotebookLM’s Video Overview** generates presentations with AI narration. For a visual learner, this can be your jam.

Here’s my three-video strategy that built on what I learned from the podcasts:

#### Customization \#1: Structured learning path

**Instruction:**

_“Describe the show structure: Start with what I need to understand first, then what comes next, then what comes after that. Organize by learning sequence, not by topic complexity.”_

**My example:**

> “Start with what RAG is and why it exists, then explain the core components I need to know, then show me the basic workflow, then end with what I should learn first vs what can wait.”

**Why this works:**

- Text slides organize information in clear learning order

- You see the big picture before diving into details

- Narration explains each slide while you read


**What I actually saw:**

- Slide 1: “What is RAG?” with 3-4 bullet points

- Slide 2: “Core Components” listing embeddings, vector DB, retrieval, LLM

- Slide 3: “The Basic Workflow” with numbered steps


No complex diagrams—just organized text that built understanding step by step.

#### Customization \#2: Comparison table presentation

**Instruction:**

_“Target a specific use case: Present this to help me choose between \[OPTION A\], \[OPTION B\], and \[OPTION C\] by comparing them across key factors like complexity, cost, time investment, and best use cases.”_

**My example:**

> “Present this to help me choose how to build AI agent by comparing complexity, when to use each, and what I need to learn for each.”

**Why this works:**

- Simple text-based comparison slides show differences clearly

- Narration walks through the tradeoffs while you read

- Helps you make decisions, not just consume information


**What I actually saw:**

[![NotebookLM Video Overview Results](https://substackcdn.com/image/fetch/$s_!GfyV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c925a9e-a185-47dd-a465-6c3c4c5b4639_1832x1048.png)](https://substackcdn.com/image/fetch/$s_!GfyV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c925a9e-a185-47dd-a465-6c3c4c5b4639_1832x1048.png) NotebookLM’s video overview - Table Comparison.

- Slide showing three columns with agent type, capability, and best for

- The AI narrator explains deeper out of the slide

- Table highlighting key differences


The visualization works well to help me choose my path. I could see how I would approach building my AI agent.

#### Customization \#3: Mistake prevention checklist

**Instruction:**

_“Focus on a specific topic: Create a presentation listing the most common mistakes beginners make with \[TOPIC\]. For each mistake, explain what goes wrong and what to do instead.”_

**My example:**

> “List the most common mistakes beginners make building RAG systems. For each mistake, explain what goes wrong (like using chunks that are too small or too large) and what to do instead.”

**Why this works:**

- Slide-by-slide checklist format is easy to reference later

- Text clearly states mistake → consequence → solution

- Prevents hours of debugging obvious problems


**What I actually saw:**

- Slide 1: “Mistake #1: Chunk Size” with bullet points explaining the problem

- Slide 2: “What Happens” describing bad retrieval results

- Slide 3: “What to Do Instead” with specific guidance


This presentation became my troubleshooting reference guide whenever I found problems.

Subscribe

## Phase 3: Test your knowledge by validating what you think you know

After absorbing information through reports, podcasts, and videos, I thought I understood AI Agent and RAG systems. I could explain concepts when reading about them. I could nod along when hearing explanations.

But, I need to be tested to ensure I’ve understood the whole concept.

This is where NotebookLM’s testing features revealed the gaps between “I think I know this” and “I actually know this.”

### 1\. Use Flashcards to test my understanding

[![NotebookLM Flashcards](https://substackcdn.com/image/fetch/$s_!HyCj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe13b4e63-04e2-4df3-8f28-f7c71f75cc93_2753x1452.jpeg)](https://substackcdn.com/image/fetch/$s_!HyCj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe13b4e63-04e2-4df3-8f28-f7c71f75cc93_2753x1452.jpeg)

I thought I understood concepts, but when I tried to implement, I realized I was just memorizing definitions without actually understanding how things worked together.

NotebookLM’s flashcards let you generate cards with custom instructions and ask for explanations on any answer. You can choose how many cards to make and dial the difficulty up or down. Net result: a highly tailored learning session.

Here’s how I used flashcard customizations strategically:

#### Customization \#1: Scenario-based testing

**Instructions:**

_“Create scenario-based flashcards that test my decision-making about \[TOPIC\], not just definitions. Present real situations where I need to choose the right approach.”_

**My example:**

> “Create scenario-based flashcards that test my decision-making building a RAG AI agent, not definitions”

**Why this works:**

- Forces you to APPLY knowledge, not just recognize it

- Reveals whether you understand WHEN to use what you learned

- Exposes gaps in practical understanding


**Example card I got:**

_“A user uploads a 200-page PDF manual and wants to ask questions about it. Do you need: (a) fine-tuning, (b) RAG, (c) prompt engineering, or (d) function calling?”_

I confidently answered “prompt engineering” because I thought you could just paste the content in the prompt.

**Wrong.**

The answer was RAG because 200 pages exceeds context windows and you need retrieval to pull relevant sections. This flashcard revealed I didn’t actually understand when RAG was necessary vs optional.

#### Customization \#2: Common mistakes for beginners

**Instructions:**

_“Focus on common mistakes beginners make with \[TOPIC\]. Create flashcards that test whether I can identify what’s wrong and why.”_

**My example:**

> “Focus on common mistakes beginners make when building an AI agent”

**Why this works:**

- Prepares you for problems before you encounter them

- Tests understanding of failure modes

- Builds troubleshooting intuition


**Example card that saved me from future headaches:**

[![NotebookLM Flashcards Example](https://substackcdn.com/image/fetch/$s_!cRmn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23042f78-6d03-492f-a1b8-fddac081ef77_2601x1537.jpeg)](https://substackcdn.com/image/fetch/$s_!cRmn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F23042f78-6d03-492f-a1b8-fddac081ef77_2601x1537.jpeg)

See? The flashcards are fully tailored to my custom instructions. If I want to ask about the reasoning behind an answer, I can click “Explain,” and it will take me to the Chat section where I can explore more.

#### Customization \#3: Learn terminology for better understanding

**Instructions:**

_“Create flashcards for the specific terms I keep confusing in \[TOPIC\]. Ask me to explain the difference between similar concepts in one sentence each.”_

**My example:**

> “Create flashcards for the specific terms I keep confusing: embeddings vs vectors vs vector databases, semantic search vs keyword search, retrieval vs generation.”

**Why this works:**

- Clarifies terminology blocking your comprehension

- Forces precise understanding, not vague “I kind of get it”

- Makes documentation suddenly readable


**The terminology that was blocking me:**

- _“Explain the difference between embeddings, vectors, and vector databases in one sentence each”_

  - Embeddings = converting text into numbers

  - Vectors = those numbers in array form

  - Vector databases = storage systems optimized for finding similar vectors
- _“What’s the difference between semantic search and keyword search?”_

  - Keyword = finding exact word matches

  - Semantic = finding meaning matches (even with different words)

Getting this terminology straight made reading documentation 10x easier.

### 2\. Quiz it: test how the ideas apply and connect

[![NotebookLM Quiz Feature](https://substackcdn.com/image/fetch/$s_!UT4R!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F134752cd-310d-432a-bdb6-9d88baaa7dd8_2792x1432.jpeg)](https://substackcdn.com/image/fetch/$s_!UT4R!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F134752cd-310d-432a-bdb6-9d88baaa7dd8_2792x1432.jpeg)

If you’re like me, you’re not satisfied with just flashcards. You’ll look for other ways to test your understanding of the new topics you’re learning. That’s why I tuned the quiz to stress‑test harder and reveal whether I can synthesize knowledge and solve real problems.

NotebookLM’s Quiz feature generates multiple-choice questions with explanations. Unlike flashcards which don’t provide answer options.

**Here’s my quiz customization strategy:**

#### Customization \#1: Integration testing across concepts

**Instructions:**

_“Create quiz questions that require me to combine multiple concepts from \[TOPIC\] to solve problems. Don’t test concepts in isolation—test whether I understand how they work together.”_

**My Example:**

> “Create quiz questions that require me to combine multiple RAG concepts—embeddings, chunk size, retrieval quality, and LLM generation—to solve real implementation problems.”

**Why this works:**

- Tests whether you understand the SYSTEM, not just parts

- Reveals gaps in how concepts connect

- Prepares you for real-world complexity where nothing works in isolation


**Example question I got:** _“Your RAG chatbot returns accurate information but users complain answers lack context. The issue is most likely: (a) Wrong embedding model, (b) Chunk size too small, (c) Vector database error, (d) LLM not understanding the question”_

I guessed (a) because embedding seemed most technical.

**Wrong.**

Answer: (b) Chunk size too small—retrieves precise matches but loses surrounding context needed for complete answers. This question revealed I didn’t understand how chunk size affects answer quality, only that it affects retrieval.

#### Customization \#2: Tradeoff decision testing

**Instructions:**

_“Create quiz questions about the tradeoffs in \[TOPIC\]. For each question, make me choose between options where each has valid pros and cons—there’s no universally ‘correct’ answer without context.”_

**My Example:**

> “Create quiz questions about architectural tradeoffs in RAG systems. Make me choose between options based on different priorities like speed vs accuracy, cost vs quality, simplicity vs power.”

**Why this works:**

- Prepares you for real decisions with no perfect answer

- Tests understanding of WHY you’d choose each option

- Builds decision-making frameworks, not just knowledge


**Example question I got:** _“For a chatbot answering 10,000 questions/day, which approach balances cost and quality: (a) Retrieve 3 chunks with high-quality embeddings, (b) Retrieve 10 chunks with standard embeddings, (c) Retrieve 1 chunk with re-ranking, (d) Retrieve 5 chunks with hybrid search”_

This wasn’t about “right” answer—it was about understanding the tradeoff:

- More chunks = better context but higher cost

- Better embeddings = better retrieval but slower/expensive

- Re-ranking = improved relevance but added complexity

- Hybrid search = best results but most expensive


The quiz forced me to think through implications, not just pick the fanciest option.

#### Customization \#3: Failure mode prediction

**Instructions:**

_“Create quiz questions asking me to predict what will break or fail in \[TOPIC\]. Present scenarios and ask what problem will occur and why.”_

**My Example:**

> “Create quiz questions asking me to predict what breaks when building AI agent systems. Present implementation scenarios and ask what problem will occur.”

**Why this works:**

- Builds debugging intuition before you need it

- Tests understanding of how systems fail, not just how they work

- Prepares you for troubleshooting real problems


**Example question I got:**

[![](https://substackcdn.com/image/fetch/$s_!G5bK!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F91995885-2957-4b3a-8421-dd54949b1460_2016x1983.jpeg)](https://substackcdn.com/image/fetch/$s_!G5bK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F91995885-2957-4b3a-8421-dd54949b1460_2016x1983.jpeg)

The correct answer was D because specificity is necessary to build an AI agent that actually solves business problems and meets real needs.

If you’re unsure about your answer, ask for a hint. It’ll nudge you toward the right one.

## What actually changed

After a week of learning this, I finally understood exactly what I need to know right now versus what I can figure out later. I can start building my AI agent chatbot for my newsletter, so readers get full access to my knowledge—pulling resources across my newsletter and social notes—whenever they want to learn or explore my content archives.

**Here’s what surprised me most about this whole process:**

**I thought NotebookLM’s new features were about generating different formats.** Podcast, video, flashcards, quiz—just more ways to consume the same information, right?

Wrong.

Each format solved a different learning problem I didn’t even know I had:

1. **Reports** gave me the foundation, but I wasn’t going to re-read them during my commute.

2. **Podcasts** let me learn while walking, but I couldn’t visualize how components connected.

3. **Videos** showed me the structure, but I thought I understood more than I actually did.

4. **Flashcards** revealed I was just recognizing answers, not truly understanding them.

5. **Quizzes** exposed that I couldn’t actually apply what I’d learned.


What I realized was all features were built to customize my learning needs by meeting them where I was.

Six months ago, I wrote about NotebookLM as a learning tool. That post became my most popular because readers connected with the idea of turning AI into a personalized learning system instead of following generic tutorials.

But what I didn’t realize then—and what I understand now—is this:

**The future of learning isn’t about AI teaching you.**

**It’s about you teaching AI how to teach YOU.**

Every customization I shared in this post was me telling NotebookLM where my knowledge gaps were, how my brain makes connections, what learning style works for my situation. The AI didn’t magically know this. I had to design my own learning path.

And honestly? That’s the real skill worth developing.

If you’re trying to learn something complex right now, whether it’s AI development like me, or marketing, or fitness, or anything else, stop forcing yourself through tutorials that weren’t designed for where you are.

Instead, think about:

- What do you already know that you can anchor this new thing to?

- Where are you actually confused right now?

- Are you testing if you recognize information or if you can actually apply it?


Then use NotebookLM’s customization to build the learning system you need.

The prompts I shared aren’t magic formulas. They’re examples of designing learning that matches where you are and where you’re trying to go. Your customizations will look different because your learning needs are different.

And that’s exactly the point.

**How’s NotebookLM working for you? Drop your go‑to tips and tricks in the comments.**

* * *

I’m building more systems like this—AI workflows that solve real problems I’m actually facing. Some save me hours every week. Others took weeks of experimentation to get right.

If you want to see how I’m figuring this stuff out in real-time, subscribe to AI Maker. I share the complete breakdowns, the exact systems, the mistakes I made, and what actually works.

Get more done with less effort. Upgrade to Maker Labs for automation that streamlines your work and boosts results 👇

Subscribe

Because the best way to learn isn’t reading about what’s possible.

**It’s watching someone figure things out, copying what works, and learning as you go.**

[![Anne O's avatar](https://substackcdn.com/image/fetch/$s_!xhci!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf5ce7f4-e149-422b-a9bd-5e3350ff9cfa_144x144.png)](https://substack.com/profile/28981850-anne-o)

[![Mervyn Chua's avatar](https://substackcdn.com/image/fetch/$s_!770g!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7940aa7-afbd-4498-93b5-884a9ffb1664_3119x3119.jpeg)](https://substack.com/profile/173911108-mervyn-chua)

[![Beyhan Filiz's avatar](https://substackcdn.com/image/fetch/$s_!Q3nW!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffdc8090c-4d10-4171-8595-3bde5d8cc9ae_96x96.jpeg)](https://substack.com/profile/310309430-beyhan-filiz)

[![Wyndo's avatar](https://substackcdn.com/image/fetch/$s_!zTXR!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ac42946-717d-4e50-8477-551c5d7a3025_1638x1638.jpeg)](https://substack.com/profile/556836-wyndo)

[![Allen's avatar](https://substackcdn.com/image/fetch/$s_!H8mB!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0296a47f-5089-43a0-90ff-1c744fcbc278_1122x1125.jpeg)](https://substack.com/profile/316744370-allen)

478 Likes∙

[55 Restacks](https://substack.com/note/p-173017091/restacks?utm_source=substack&utm_content=facepile-restacks)

478

[74](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comments)
55

Share

#### Discussion about this post

CommentsRestacks

![User's avatar](https://substackcdn.com/image/fetch/$s_!TnFC!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png)

[![Sam Illingworth's avatar](https://substackcdn.com/image/fetch/$s_!rb5v!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faaf6aa29-e338-4f95-b570-ae94aacf55a7_666x635.jpeg)](https://substack.com/profile/253722705-sam-illingworth?utm_source=comment)

[Sam Illingworth](https://substack.com/profile/253722705-sam-illingworth?utm_source=substack-feed-item)

[7d](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comment/164577221 "Oct 9, 2025, 9:23 AM")

Liked by Wyndo

Thanks for another brilliant post Wyndo. I really need to jump on the NLM train. I am thinking of doing some lowkey systematic reviews as a starting point... 🙏

Expand full comment

Like (4)

Reply

Share

[2 replies by Wyndo and others](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comment/164577221)

[![Saif's avatar](https://substackcdn.com/image/fetch/$s_!tcEC!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0832dc25-53f5-42f6-a242-2f4a4b916ded_1165x1167.jpeg)](https://substack.com/profile/364358846-saif?utm_source=comment)

[Saif](https://substack.com/profile/364358846-saif?utm_source=substack-feed-item)

[7d](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comment/164570190 "Oct 9, 2025, 9:01 AM")

Liked by Wyndo

You mentioned this post some weeks back. My mind is blown. Every time I think I’ve figured out an AI tool you show me I was just tinkering. This is mastery.

Expand full comment

Like (4)

Reply

Share

[1 reply by Wyndo](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comment/164570190)

[72 more comments...](https://aimaker.substack.com/p/learn-ai-agents-notebooklm-customization-guide-video-podcast-flashcards-quiz/comments)

TopLatestDiscussions

[How I Learned Complex Topics 10x Faster with NotebookLM](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm)

[And why you should too.](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm)

Apr 3•
[Wyndo](https://substack.com/@wyndo)

748

[83](https://aimaker.substack.com/p/how-i-learned-complex-topics-10x-faster-notebooklm/comments)

![](https://substackcdn.com/image/fetch/$s_!V_5I!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3cff0964-a5b2-4273-ba77-8277640f0c73_1536x1024.png)

[My AI Therapy Workflow: Turn Claude/ChatGPT and NotebookLM Into Your Self-Discovery Tool](https://aimaker.substack.com/p/my-ai-therapy-workflow-turn-claude-notebooklm-self-discovery-tool)

[Therapy is the #1 use case for AI in 2025, this is how you can maximize it.](https://aimaker.substack.com/p/my-ai-therapy-workflow-turn-claude-notebooklm-self-discovery-tool)

Apr 24•
[Wyndo](https://substack.com/@wyndo)

418

[78](https://aimaker.substack.com/p/my-ai-therapy-workflow-turn-claude-notebooklm-self-discovery-tool/comments)

![](https://substackcdn.com/image/fetch/$s_!1_1I!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff82bf4ef-1c35-4864-af0e-8fbea00e08b2_1536x1024.png)

[How I Used James Clear's Atomic Habits to Build 15 AI Systems That Run My Life](https://aimaker.substack.com/p/how-i-used-james-clears-atomic-habits-build-ai-systems-run-my-life)

[The simple framework that turned me into an AI-First thinker.](https://aimaker.substack.com/p/how-i-used-james-clears-atomic-habits-build-ai-systems-run-my-life)

Jun 12•
[Wyndo](https://substack.com/@wyndo)

328

[81](https://aimaker.substack.com/p/how-i-used-james-clears-atomic-habits-build-ai-systems-run-my-life/comments)

![](https://substackcdn.com/image/fetch/$s_!6kWX!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5afd472d-a92c-4198-b1e7-f9a1e03a6f2b_1536x1024.png)

See all

Ready for more?

Subscribe
